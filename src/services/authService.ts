import { supabase } from "../lib/supabaseClient";

type SignUpApi = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
};

export function signUpApi({ email, password, name, phoneNumber }: SignUpApi) {
  return supabase.auth
    .signUp({
      email,
      password,
      options: {
        data: { name, phoneNumber, avatarUrl: "" },
      },
    })
    .then((data) => data);
}

type CreateProfileApi = {
  id: string;
  name: string;
  phoneNumber: string;
};
export async function createProfileApi({
  id,
  name,
  phoneNumber,
}: CreateProfileApi) {
  const { status, error } = await supabase
    .from("profiles")
    .insert([{ id, name, phoneNumber, avatarUrl: "" }])
    .single();

  if (status !== 201) throw error;
  return status;
}

type LoginApi = {
  email: string;
  password: string;
};
export async function loginApi({ email, password }: LoginApi) {
  return supabase.auth
    .signInWithPassword({ email, password })
    .then((data) => data);
}

export async function getUserApi() {
  return supabase.auth.getUser().then(({ data }) => data);
}

export async function logoutApi() {
  return supabase.auth.signOut().then((data) => data);
}
