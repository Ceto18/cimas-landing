export interface SocialNetworkProfile {
  nickname: string;
  label: string | null;
  url: string | null;
  social_network_name: string;
  social_network_icon: string | null;
}

export interface SocialNetworkProfilesResponse {
  success: boolean;
  message: string;
  data: SocialNetworkProfile[];
}