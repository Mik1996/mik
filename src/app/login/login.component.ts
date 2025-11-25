import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { apply, customError, email, Field, form, required, submit, validate } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { debounceTime } from 'rxjs';
import { User } from '../models/user.interface';
import { nameSchema, passwordSchema } from '../shared/schemas';

const initalForm: User = { firstName: '', lastName: '', email: '', password: '', repeatPassword: '', notifyByEmail: false };

@Component({
  selector: 'mik-login',
  imports: [Field, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  protected readonly data = signal<User>(initalForm);
  protected readonly form = form<User>(this.data, (path) => {
    // First name validators
    apply(path.firstName, nameSchema);

    // Last name validators
    apply(path.lastName, nameSchema);

    // Email validators
    email(path.email, { message: 'EMAIL_FIELD' });
    required(path.email, {
      when: ({ valueOf }) => valueOf(path.notifyByEmail) === true,
      message: 'REQUIRED_FIELD',
    });

    // Password validators
    apply(path.password, passwordSchema);

    // Repeat password validators
    validate(path.repeatPassword, ({ valueOf }) =>
      valueOf(path.password) !== valueOf(path.repeatPassword)
        ? customError({ kind: 'passwordsDoNotMatch', message: 'DIFFERENT_PASSWORD' })
        : null
    );
  });

  private readonly textDebounced = toSignal(toObservable(this.form.email().value).pipe(debounceTime(300)));
  list = httpResource(() => (this.textDebounced() ? `https://jsonplaceholder.typicode.com/users?q=${this.textDebounced()}` : undefined));

  submitHandler = (event: SubmitEvent) => {
    event.preventDefault();
    submit(this.form, async (form) => {
      const {repeatPassword, ...user} = form().value();
      try {
        await fetch(`https://dummyjson.com/users/2`, {
          method: 'PUT',
          body: JSON.stringify(user),
        });
        form().reset();

        /**
         * In quest'esempio, vedremo che l'errore verrà visualizzato tra gli errori di email
         */
        // throw Error('Could not save user with this email...');
        return undefined; // Nessun errore
      } catch (error) {
        return [
          {
            kind: 'server',
            field: form.email, // per esempio...
            message: (error as Error).message,
          },
        ];
      }
    });
  };
}
