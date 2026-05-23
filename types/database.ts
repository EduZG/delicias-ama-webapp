import type { OrderStatus } from "@/types/order";
import type { UserRole } from "@/types/profile";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          default_address: string | null;
          role: UserRole;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          default_address?: string | null;
          role?: UserRole;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          default_address?: string | null;
          role?: UserRole;
          created_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          price: number;
          image_url: string | null;
          category: string | null;
          is_active: boolean;
          is_featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          category?: string | null;
          is_active?: boolean;
          is_featured?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          customer_name: string;
          customer_phone: string;
          delivery_method: string;
          delivery_address: string | null;
          status: OrderStatus;
          subtotal: number;
          total_amount: number;
          payment_status: string | null;
          payment_provider: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          customer_name: string;
          customer_phone: string;
          delivery_method: string;
          delivery_address?: string | null;
          status?: OrderStatus;
          subtotal: number;
          total_amount: number;
          payment_status?: string | null;
          payment_provider?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_name: string;
          quantity: number;
          unit_price: number;
          total_price: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_name: string;
          quantity: number;
          unit_price: number;
          total_price: number;
        };
        Update: Partial<
          Database["public"]["Tables"]["order_items"]["Insert"]
        >;
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          label: string | null;
          address_line: string;
          city: string | null;
          postal_code: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          label?: string | null;
          address_line: string;
          city?: string | null;
          postal_code?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["addresses"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
