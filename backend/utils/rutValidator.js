/**
 * Calcula el DV de un RUT y lo compara con el DV proporcionado.
 * @param {string} rut El RUT a validar.
 * @returns `true` si el RUT es válido, es decir, si los DVs coinciden.
 *          `false` en caso contrario.
 */
export const validateRut = (rut) => {
  const [body, dv] = rut.split("-");
  const reversedBody = [...body].reverse();
  let sum = 0;
  let multiplier = 0;

  for (let i = 0; i < reversedBody.length; i++) {
    if (!isNaN(reversedBody[i])) {
      sum += reversedBody[i] * ((multiplier++ % 6) + 2);
    }
  }

  const result = 11 - (sum % 11);
  const calculatedDv = result === 10 ? "K" : result % 11;

  return dv == calculatedDv;
};
