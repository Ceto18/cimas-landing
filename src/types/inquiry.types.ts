export interface InquiryPayload {
  full_name: string;
  company: string;
  email: string;
  type_project_uuid: string;
  project_scope: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface ProjectTypeOption {
  uuid: string;
  name: string;
}