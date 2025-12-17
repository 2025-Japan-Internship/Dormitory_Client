import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function useUserProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const fullName = user.user_metadata?.full_name ?? "";
      const nameOnly = fullName.includes("_")
        ? fullName.split("_")[1]
        : fullName;

      const { data: dbProfile } = await supabase
        .from("profiles")
        .select("roomNum, avatar_url, bonus_point, minus_point")
        .eq("user_id", user.id)
        .single();

      const avatar =
        dbProfile?.avatar_url ||
        user.user_metadata?.avatar_url ||
        user.identities?.[0]?.identity_data?.picture ||
        "";

      setProfile({
        userId: user.id,
        name: nameOnly,
        avatarUrl: avatar,
        roomNum: dbProfile?.roomNum ?? null,
        bonusPoint: dbProfile?.bonus_point ?? 0,
        minusPoint: dbProfile?.minus_point ?? 0,
      });

      setLoading(false);
    };

    loadProfile();
  }, []);

  return { profile, loading };
}
