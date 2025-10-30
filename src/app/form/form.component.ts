import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  apply,
  customError,
  email,
  Field,
  form,
  minLength,
  required,
  schema,
  Schema,
  submit,
  validate,
  validateHttp,
} from '@angular/forms/signals';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { debounceTime } from 'rxjs';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  notifyByEmail: boolean;
}

const initalForm: User = { firstName: '', lastName: '', email: '', notifyByEmail: false };

const nameSchema: Schema<string> = schema((path) => {
  required(path, { message: 'REQUIRED_FIELD' });
  minLength(path, 3, { message: 'MINLENGHT_3_FIELD' });
  // validate(path, (c) =>
  //   c.value().toLowerCase() === 'foo'
  //     ? customError({ kind: 'foo', message: 'This field cannot be "Foo"' })
  //     : null
  // );
});

@Component({
  selector: 'app-form',
  imports: [Field, TranslatePipe, TranslateDirective],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  standalone: true,
})
export class FormComponent {
  protected readonly data = signal<User>(initalForm);
  protected readonly form = form<User>(this.data, (path) => {
    apply(path.firstName, nameSchema);
    apply(path.lastName, nameSchema);

    required(path.email, {
      when: ({ valueOf }) => valueOf(path.notifyByEmail) === true,
      message: 'REQUIRED_FIELD',
    });
    email(path.email, { message: 'EMAIL_FIELD' });
    // Non funziona
    validateHttp(path.email, {
      request: (c) =>
        c.value() ? `https://jsonplaceholder.typicode.com/users?email=${c.value()}` : undefined,
      onError: () => {},
      onSuccess: () => {},
    });
  });

  textDebounced = toSignal(toObservable(this.form.email().value).pipe(debounceTime(300)));

  list = httpResource(() =>
    this.textDebounced()
      ? `https://jsonplaceholder.typicode.com/users?q=${this.textDebounced()}`
      : undefined
  );

  submitHandler = (event: SubmitEvent) => {
    event.preventDefault();
    submit(this.form, async (form) => {
      try {
        await fetch(`https://dummyjson.com/users/2`, {
          method: 'PUT',
          body: JSON.stringify(form().value()),
        });
        form().reset();

        /**
         * In quest'esempio, vedremo che l'errore verrà visualizzato tra gli errori di email
         */
        // throw Error('Could not save user with this email...');
        return undefined; // Nessun errore
      } catch (error) {
        return [{
          kind: 'server',
          field: form.email, // per esempio...
          message: (error as Error).message
        }]
      }
    });
  };
}
