import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

export type ClientForm = ReturnType<typeof createClientForm>;

export function createClientForm(
  params: {
    name: string;
    salary: number | null;
    companyValuation: number | null;
  } = {
    name: '',
    salary: null,
    companyValuation: null,
  },
  fb = inject(FormBuilder)
) {
  return fb.group({
    name: fb.control<string>(params.name, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    salary: fb.control<number | null>(params.salary, [Validators.required]),
    companyValuation: fb.control<number | null>(params.companyValuation, [
      Validators.required,
    ]),
  });
}
