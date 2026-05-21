export type UserRole = "customer" | "admin" | "kitchen";

export type Profile = {
  id: string;
  fullName?: string;
  phone?: string;
  defaultAddress?: string;
  role: UserRole;
  createdAt: string;
};
