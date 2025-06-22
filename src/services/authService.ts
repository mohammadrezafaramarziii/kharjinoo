import { supabase } from "../lib/supabaseClient";

// SIGN UP ****
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

// LOGIN ****
type LoginApi = {
  email: string;
  password: string;
};
export async function loginApi({ email, password }: LoginApi) {
  return supabase.auth
    .signInWithPassword({ email, password })
    .then((data) => data);
}

// GET USER ****
export async function getUserApi() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null };

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(error);
    return { user: null };
  }

  return {
    user: {
      ...profile,
      email: user.email,
      last_sign_in_at: user.last_sign_in_at,
    },
  };
}

// LOGOUT ****
export async function logoutApi() {
  return supabase.auth.signOut().then((data) => data);
}

// UPLOAD AVATAR USER ****
type AvatarParams = {
  fileName: string;
  avatarFile: File;
};
export function uploadAvatarApi({ fileName, avatarFile }: AvatarParams) {
  return supabase.storage
    .from("avatars")
    .upload(fileName, avatarFile, {
      upsert: true,
    })
    .then(({ data }) => data);
}

export async function updateAvatarApi({ fileName, avatarFile }: AvatarParams) {
  return await supabase.storage
    .from("avatars")
    .update(fileName, avatarFile, {
      upsert: true,
    })
    .then(({ data }) => data);
}

// UPDATE PROFILE USER ****
type UpdateProfileApi = {
  userId: string;
  name: string;
  // email: string;
  phoneNumber: string;
  avatarUrl?: string;
};
export async function updateProfileApi({
  userId,
  name,
  // email,
  phoneNumber,
  avatarUrl,
}: UpdateProfileApi) {
  return supabase
    .from("profiles")
    .update({
      name,
      // email,
      phoneNumber,
      avatarUrl,
    })
    .eq("id", userId);
}

// CHANGE PASSWORD USER ****
export async function changePasswordApi({
  newPassword,
}: {
  newPassword: string;
}) {
  return await supabase.auth
    .updateUser({
      password: newPassword,
    })
    .then(({ data }) => data);
}
