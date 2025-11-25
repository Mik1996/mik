/**
 * Regole applicate:
	•	minimo 8 caratteri
	•	almeno 1 lettera minuscola
	•	almeno 1 lettera maiuscola
	•	almeno 1 cifra
	•	almeno 1 carattere speciale (senza spazi)
	•	nessun whitespace
 */
export const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_+\-=\[\]{};':"\\|,.<>\/\?`~])[A-Za-z\d!@#\$%\^&\*$begin:math:text$$end:math:text$_+\-=$begin:math:display$$end:math:display${};':"\\|,.<>\/\?`~]{8,}$/;
