
"use client";

import {
  type FormEvent,
  useState,
} from "react";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  LockKeyhole,
} from "lucide-react";

import { createInquiry } from "@/services/inquiries.service";

import type {
  InquiryPayload,
} from "@/types/inquiry.types";

import type {
  ProjectType,
} from "@/types/project.types";

interface ContactFormProps {
  projectTypes: ProjectType[];
}

const initialForm: InquiryPayload = {
  full_name: "",
  company: "",
  email: "",
  type_project_uuid: "",
  project_scope: "",
};

const fieldClass =
  "h-[52px] w-full rounded-md border border-[#d7e0e8] bg-[#fbfcfd] px-4 text-[14px] text-[#183751] outline-none transition-all duration-200 placeholder:text-[#9aa9b8] focus:border-[#478cb7] focus:bg-white focus:ring-[3px] focus:ring-[#478cb7]/10 disabled:cursor-not-allowed disabled:opacity-60";

const fieldLabel =
  "mb-2.5 block text-[12px] font-semibold text-[#284561]";

export function ContactForm({
  projectTypes,
}: ContactFormProps) {
  const [form, setForm] =
    useState<InquiryPayload>(initialForm);

  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (
    field: keyof InquiryPayload,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (errorMessage) setErrorMessage("");
    if (successMessage) setSuccessMessage("");
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!form.full_name.trim()) {
      setErrorMessage("Ingresa tu nombre completo.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
      )
    ) {
      setErrorMessage("Ingresa un correo electrónico válido.");
      return;
    }

    if (!form.type_project_uuid) {
      setErrorMessage("Selecciona una especialidad.");
      return;
    }

    if (!form.project_scope.trim()) {
      setErrorMessage(
        "Describe la ubicación y el alcance del proyecto."
      );
      return;
    }

    if (!accepted) {
      setErrorMessage(
        "Debes confirmar la información antes de enviar."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: InquiryPayload = {
        full_name: form.full_name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        type_project_uuid: form.type_project_uuid,
        project_scope: form.project_scope.trim(),
      };

      const response = await createInquiry(payload);

      setSuccessMessage(
        response.message ||
          "Tu consulta fue registrada correctamente."
      );

      setForm(initialForm);
      setAccepted(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No se pudo enviar tu consulta. Inténtalo nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="formulario"
      className="w-full scroll-mt-28 overflow-hidden rounded-xl border border-[#dce4eb] bg-white shadow-[0_16px_45px_rgba(13,41,72,0.055)]"
    >
      {/* BARRA SUPERIOR */}
      <div className="h-1 w-full bg-[#0d2948]">
        <div className="h-full w-[28%] bg-[#d98542]" />
      </div>

      <div className="px-6 pb-7 pt-8 sm:px-9 sm:pb-9 sm:pt-10 lg:px-10">
        {/* ENCABEZADO */}
        <div className="mb-8 border-b border-[#e8edf2] pb-7">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#bd783f]">
              Formulario de contacto
            </p>

            <span className="text-[11px] text-[#8897a7]">
              * Campos obligatorios
            </span>
          </div>

          <h3 className="text-[28px] font-normal leading-tight tracking-[-0.035em] text-[#0d2948] sm:text-[32px]">
            Cuéntanos sobre tu proyecto.
          </h3>

          <p className="mt-3 max-w-lg text-[13px] leading-6 text-[#718195]">
            Completa la siguiente información para
            que nuestro equipo pueda evaluar tu solicitud.
          </p>
        </div>

        {/* MENSAJES */}
        {successMessage && (
          <div
            role="status"
            className="mb-7 flex items-start gap-3 rounded-md border border-[#b8dfcc] bg-[#edf8f2] px-4 py-4 text-sm text-[#216c49]"
          >
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0"
            />

            <p>{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="mb-7 flex items-start gap-3 rounded-md border border-[#f0c7c1] bg-[#fff3f1] px-4 py-4 text-sm text-[#a33f38]"
          >
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <p>{errorMessage}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* DATOS DEL SOLICITANTE */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#7a8ea1]">
              01 / Datos del solicitante
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="inquiry-name"
                  className={fieldLabel}
                >
                  Nombre completo <span className="text-[#c9793b]">*</span>
                </label>

                <input
                  id="inquiry-name"
                  type="text"
                  value={form.full_name}
                  onChange={(event) =>
                    updateField("full_name", event.target.value)
                  }
                  placeholder="Nombre y apellidos"
                  autoComplete="name"
                  maxLength={150}
                  required
                  disabled={isSubmitting}
                  className={fieldClass}
                />
              </div>

              <div>
                <label
                  htmlFor="inquiry-company"
                  className={fieldLabel}
                >
                  Empresa o entidad
                </label>

                <input
                  id="inquiry-company"
                  type="text"
                  value={form.company}
                  onChange={(event) =>
                    updateField("company", event.target.value)
                  }
                  placeholder="Nombre de la empresa"
                  autoComplete="organization"
                  maxLength={200}
                  disabled={isSubmitting}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="inquiry-email"
                className={fieldLabel}
              >
                Correo electrónico <span className="text-[#c9793b]">*</span>
              </label>

              <input
                id="inquiry-email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  updateField("email", event.target.value)
                }
                placeholder="nombre@empresa.com"
                autoComplete="email"
                maxLength={254}
                required
                disabled={isSubmitting}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="h-px bg-[#e8edf2]" />

          {/* DATOS DEL PROYECTO */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#7a8ea1]">
              02 / Información del proyecto
            </p>

            <div>
              <label
                htmlFor="inquiry-type"
                className={fieldLabel}
              >
                Tipo de proyecto <span className="text-[#c9793b]">*</span>
              </label>

              <select
                id="inquiry-type"
                value={form.type_project_uuid}
                onChange={(event) =>
                  updateField(
                    "type_project_uuid",
                    event.target.value
                  )
                }
                required
                disabled={
                  isSubmitting ||
                  projectTypes.length === 0
                }
                className={fieldClass}
              >
                <option value="">
                  Selecciona el tipo de proyecto
                </option>

                {projectTypes.map((type) => (
                  <option
                    key={type.uuid}
                    value={type.uuid}
                  >
                    {type.name}
                  </option>
                ))}
              </select>

              {projectTypes.length === 0 && (
                <p className="mt-2 text-xs text-[#b45309]">
                  No hay tipos de proyecto disponibles.
                </p>
              )}
            </div>

            <div className="mt-5">
              <label
                htmlFor="inquiry-scope"
                className={fieldLabel}
              >
                Ubicación y alcance del proyecto{" "}
                <span className="text-[#c9793b]">*</span>
              </label>

              <textarea
                id="inquiry-scope"
                value={form.project_scope}
                onChange={(event) =>
                  updateField(
                    "project_scope",
                    event.target.value
                  )
                }
                placeholder="Indícanos dónde se desarrollará el proyecto, qué necesitas realizar y cualquier detalle relevante..."
                rows={5}
                maxLength={5000}
                required
                disabled={isSubmitting}
                className="w-full resize-y rounded-md border border-[#d7e0e8] bg-[#fbfcfd] px-4 py-3.5 text-[14px] leading-6 text-[#183751] outline-none transition-all duration-200 placeholder:text-[#9aa9b8] focus:border-[#478cb7] focus:bg-white focus:ring-[3px] focus:ring-[#478cb7]/10 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>

          {/* CONSENTIMIENTO */}
          <div className="border-t border-[#e8edf2] pt-5">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) =>
                  setAccepted(event.target.checked)
                }
                required
                disabled={isSubmitting}
                className="mt-1 h-[17px] w-[17px] shrink-0 accent-[#0d2948]"
              />

              <span className="text-[13px] leading-6 text-[#52657a]">
                Confirmo que la información proporcionada
                es correcta y autorizo su envío para la
                atención de mi consulta.
              </span>
            </label>
          </div>

          {/* BOTÓN */}
          <div className="flex flex-col gap-4 border-t border-[#e8edf2] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-[#8a99a8]">
              <LockKeyhole size={15} />

              <span>
                Información enviada de forma segura
              </span>
            </div>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                projectTypes.length === 0
              }
              className="group inline-flex h-[50px] items-center justify-center gap-3 rounded-md bg-[#d98542] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#c87534] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar consulta
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
