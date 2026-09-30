import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_contact_contacts_button_target" AS ENUM('_blank', '_self', '_parent', '_top');
  CREATE TYPE "public"."enum_pages_contact_community_button_target" AS ENUM('_blank', '_self', '_parent', '_top');
  CREATE TYPE "public"."enum_pages_contact_community_button_variant" AS ENUM('default', 'destructive', 'outline', 'secondary', 'ghost', 'link');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_contact_v_contacts_button_target" AS ENUM('_blank', '_self', '_parent', '_top');
  CREATE TYPE "public"."enum__pages_contact_v_community_button_target" AS ENUM('_blank', '_self', '_parent', '_top');
  CREATE TYPE "public"."enum__pages_contact_v_community_button_variant" AS ENUM('default', 'destructive', 'outline', 'secondary', 'ghost', 'link');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_live_support_card_span" AS ENUM('one', 'two', 'three');
  CREATE TYPE "public"."enum_services_market_rate_card_span" AS ENUM('one', 'two', 'three');
  CREATE TYPE "public"."enum_services_secure_card_span" AS ENUM('one', 'two', 'three');
  CREATE TYPE "public"."enum_services_transaction_card_span" AS ENUM('one', 'two', 'three');
  CREATE TYPE "public"."enum_global_navbar_items_items_target" AS ENUM('_blank', '_self', '_parent', '_top');
  CREATE TYPE "public"."enum_global_navbar_items_key" AS ENUM('business', 'services');
  CREATE TYPE "public"."enum_global_footer_columns_items_target" AS ENUM('_blank', '_self', '_parent', '_top');
  CREATE TYPE "public"."enum_global_footer_columns_key" AS ENUM('business', 'services');
  CREATE TYPE "public"."enum_global_contact_social_media_links_target" AS ENUM('_blank', '_self', '_parent', '_top');
  CREATE TABLE "pages_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"sub_heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"sub_heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_coins" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"trade_coin_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hero_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"sub_heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_contact_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"button_text" varchar,
  	"button_url" varchar,
  	"button_target" "enum_pages_contact_contacts_button_target",
  	"button_description" varchar
  );
  
  CREATE TABLE "pages_contact_community" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"button_text" varchar,
  	"button_url" varchar,
  	"button_target" "enum_pages_contact_community_button_target",
  	"button_variant" "enum_pages_contact_community_button_variant"
  );
  
  CREATE TABLE "pages_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_meta_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_meta_robots" varchar,
  	"seo_structured_data" jsonb,
  	"seo_meta_viewport" varchar,
  	"seo_canonical_u_r_l" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"logos_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "_pages_testimonials_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"sub_heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_faq_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"sub_heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_coins_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"trade_coin_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_services_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_steps_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"step_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_hero_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_header_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"sub_heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_content_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_contact_v_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"button_text" varchar,
  	"button_url" varchar,
  	"button_target" "enum__pages_contact_v_contacts_button_target",
  	"button_description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_contact_v_community" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"button_text" varchar,
  	"button_url" varchar,
  	"button_target" "enum__pages_contact_v_community_button_target",
  	"button_variant" "enum__pages_contact_v_community_button_variant",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_contact_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_meta_image_id" integer,
  	"version_seo_keywords" varchar,
  	"version_seo_meta_robots" varchar,
  	"version_seo_structured_data" jsonb,
  	"version_seo_meta_viewport" varchar,
  	"version_seo_canonical_u_r_l" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"logos_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"content" varchar,
  	"image_id" integer,
  	"featured" boolean DEFAULT false,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_content" varchar,
  	"version_image_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"faqs_id" integer
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar,
  	"category_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "heroes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"sub_heading" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "logos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"sub_heading" varchar,
  	"live_support_card_title" varchar,
  	"live_support_card_description" varchar,
  	"live_support_card_span" "enum_services_live_support_card_span",
  	"market_rate_card_title" varchar,
  	"market_rate_card_description" varchar,
  	"market_rate_card_span" "enum_services_market_rate_card_span",
  	"secure_card_title" varchar,
  	"secure_card_description" varchar,
  	"secure_card_span" "enum_services_secure_card_span",
  	"transaction_card_title" varchar,
  	"transaction_card_description" varchar,
  	"transaction_card_span" "enum_services_transaction_card_span",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "steps" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"sub_heading" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"user_name" varchar,
  	"user_country" varchar,
  	"user_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "trade_coins" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"sub_heading" varchar,
  	"tag" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"articles_id" integer,
  	"categories_id" integer,
  	"faqs_id" integer,
  	"heroes_id" integer,
  	"logos_id" integer,
  	"services_id" integer,
  	"steps_id" integer,
  	"testimonials_id" integer,
  	"trade_coins_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "global_navbar_items_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"url" varchar,
  	"target" "enum_global_navbar_items_items_target",
  	"description" varchar
  );
  
  CREATE TABLE "global_navbar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"key" "enum_global_navbar_items_key"
  );
  
  CREATE TABLE "global_footer_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"url" varchar,
  	"target" "enum_global_footer_columns_items_target",
  	"description" varchar
  );
  
  CREATE TABLE "global_footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"key" "enum_global_footer_columns_key"
  );
  
  CREATE TABLE "global_contact_social_media_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"url" varchar,
  	"target" "enum_global_contact_social_media_links_target"
  );
  
  CREATE TABLE "global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_meta_image_id" integer,
  	"seo_keywords" varchar,
  	"seo_meta_robots" varchar,
  	"seo_structured_data" jsonb,
  	"seo_meta_viewport" varchar,
  	"seo_canonical_u_r_l" varchar,
  	"navbar_logo_id" integer,
  	"footer_logo_id" integer,
  	"footer_description" varchar,
  	"footer_copyright" varchar,
  	"contact_email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_testimonials" ADD CONSTRAINT "pages_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_faq" ADD CONSTRAINT "pages_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_coins" ADD CONSTRAINT "pages_coins_trade_coin_id_trade_coins_id_fk" FOREIGN KEY ("trade_coin_id") REFERENCES "public"."trade_coins"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_coins" ADD CONSTRAINT "pages_coins_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_services" ADD CONSTRAINT "pages_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_steps" ADD CONSTRAINT "pages_steps_step_id_steps_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_steps" ADD CONSTRAINT "pages_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero" ADD CONSTRAINT "pages_hero_hero_id_heroes_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."heroes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_hero" ADD CONSTRAINT "pages_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_header" ADD CONSTRAINT "pages_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content" ADD CONSTRAINT "pages_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_content" ADD CONSTRAINT "pages_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_contact_contacts" ADD CONSTRAINT "pages_contact_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_contact_community" ADD CONSTRAINT "pages_contact_community_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_contact" ADD CONSTRAINT "pages_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_meta_image_id_media_id_fk" FOREIGN KEY ("seo_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_logos_fk" FOREIGN KEY ("logos_id") REFERENCES "public"."logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_testimonials_v" ADD CONSTRAINT "_pages_testimonials_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_faq_v" ADD CONSTRAINT "_pages_faq_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_coins_v" ADD CONSTRAINT "_pages_coins_v_trade_coin_id_trade_coins_id_fk" FOREIGN KEY ("trade_coin_id") REFERENCES "public"."trade_coins"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_coins_v" ADD CONSTRAINT "_pages_coins_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_services_v" ADD CONSTRAINT "_pages_services_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_steps_v" ADD CONSTRAINT "_pages_steps_v_step_id_steps_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."steps"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_steps_v" ADD CONSTRAINT "_pages_steps_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_hero_v" ADD CONSTRAINT "_pages_hero_v_hero_id_heroes_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."heroes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_hero_v" ADD CONSTRAINT "_pages_hero_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_header_v" ADD CONSTRAINT "_pages_header_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_content_v" ADD CONSTRAINT "_pages_content_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_content_v" ADD CONSTRAINT "_pages_content_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_contact_v_contacts" ADD CONSTRAINT "_pages_contact_v_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_contact_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_contact_v_community" ADD CONSTRAINT "_pages_contact_v_community_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_contact_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_contact_v" ADD CONSTRAINT "_pages_contact_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_seo_meta_image_id_media_id_fk" FOREIGN KEY ("version_seo_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_logos_fk" FOREIGN KEY ("logos_id") REFERENCES "public"."logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs" ADD CONSTRAINT "faqs_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "logos" ADD CONSTRAINT "logos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "steps_steps" ADD CONSTRAINT "steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_user_image_id_media_id_fk" FOREIGN KEY ("user_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_heroes_fk" FOREIGN KEY ("heroes_id") REFERENCES "public"."heroes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_logos_fk" FOREIGN KEY ("logos_id") REFERENCES "public"."logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_steps_fk" FOREIGN KEY ("steps_id") REFERENCES "public"."steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trade_coins_fk" FOREIGN KEY ("trade_coins_id") REFERENCES "public"."trade_coins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_navbar_items_items" ADD CONSTRAINT "global_navbar_items_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_navbar_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_navbar_items" ADD CONSTRAINT "global_navbar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_footer_columns_items" ADD CONSTRAINT "global_footer_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_footer_columns" ADD CONSTRAINT "global_footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_contact_social_media_links" ADD CONSTRAINT "global_contact_social_media_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global" ADD CONSTRAINT "global_seo_meta_image_id_media_id_fk" FOREIGN KEY ("seo_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global" ADD CONSTRAINT "global_navbar_logo_id_logos_id_fk" FOREIGN KEY ("navbar_logo_id") REFERENCES "public"."logos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global" ADD CONSTRAINT "global_footer_logo_id_logos_id_fk" FOREIGN KEY ("footer_logo_id") REFERENCES "public"."logos"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_testimonials_order_idx" ON "pages_testimonials" USING btree ("_order");
  CREATE INDEX "pages_testimonials_parent_id_idx" ON "pages_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_testimonials_path_idx" ON "pages_testimonials" USING btree ("_path");
  CREATE INDEX "pages_faq_order_idx" ON "pages_faq" USING btree ("_order");
  CREATE INDEX "pages_faq_parent_id_idx" ON "pages_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_faq_path_idx" ON "pages_faq" USING btree ("_path");
  CREATE INDEX "pages_coins_order_idx" ON "pages_coins" USING btree ("_order");
  CREATE INDEX "pages_coins_parent_id_idx" ON "pages_coins" USING btree ("_parent_id");
  CREATE INDEX "pages_coins_path_idx" ON "pages_coins" USING btree ("_path");
  CREATE INDEX "pages_coins_trade_coin_idx" ON "pages_coins" USING btree ("trade_coin_id");
  CREATE INDEX "pages_services_order_idx" ON "pages_services" USING btree ("_order");
  CREATE INDEX "pages_services_parent_id_idx" ON "pages_services" USING btree ("_parent_id");
  CREATE INDEX "pages_services_path_idx" ON "pages_services" USING btree ("_path");
  CREATE INDEX "pages_steps_order_idx" ON "pages_steps" USING btree ("_order");
  CREATE INDEX "pages_steps_parent_id_idx" ON "pages_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_steps_path_idx" ON "pages_steps" USING btree ("_path");
  CREATE INDEX "pages_steps_step_idx" ON "pages_steps" USING btree ("step_id");
  CREATE INDEX "pages_hero_order_idx" ON "pages_hero" USING btree ("_order");
  CREATE INDEX "pages_hero_parent_id_idx" ON "pages_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_path_idx" ON "pages_hero" USING btree ("_path");
  CREATE INDEX "pages_hero_hero_idx" ON "pages_hero" USING btree ("hero_id");
  CREATE INDEX "pages_header_order_idx" ON "pages_header" USING btree ("_order");
  CREATE INDEX "pages_header_parent_id_idx" ON "pages_header" USING btree ("_parent_id");
  CREATE INDEX "pages_header_path_idx" ON "pages_header" USING btree ("_path");
  CREATE INDEX "pages_content_order_idx" ON "pages_content" USING btree ("_order");
  CREATE INDEX "pages_content_parent_id_idx" ON "pages_content" USING btree ("_parent_id");
  CREATE INDEX "pages_content_path_idx" ON "pages_content" USING btree ("_path");
  CREATE INDEX "pages_content_image_idx" ON "pages_content" USING btree ("image_id");
  CREATE INDEX "pages_contact_contacts_order_idx" ON "pages_contact_contacts" USING btree ("_order");
  CREATE INDEX "pages_contact_contacts_parent_id_idx" ON "pages_contact_contacts" USING btree ("_parent_id");
  CREATE INDEX "pages_contact_community_order_idx" ON "pages_contact_community" USING btree ("_order");
  CREATE INDEX "pages_contact_community_parent_id_idx" ON "pages_contact_community" USING btree ("_parent_id");
  CREATE INDEX "pages_contact_order_idx" ON "pages_contact" USING btree ("_order");
  CREATE INDEX "pages_contact_parent_id_idx" ON "pages_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_contact_path_idx" ON "pages_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_meta_image_idx" ON "pages" USING btree ("seo_meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "pages_rels_faqs_id_idx" ON "pages_rels" USING btree ("faqs_id");
  CREATE INDEX "pages_rels_logos_id_idx" ON "pages_rels" USING btree ("logos_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "_pages_testimonials_v_order_idx" ON "_pages_testimonials_v" USING btree ("_order");
  CREATE INDEX "_pages_testimonials_v_parent_id_idx" ON "_pages_testimonials_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_testimonials_v_path_idx" ON "_pages_testimonials_v" USING btree ("_path");
  CREATE INDEX "_pages_faq_v_order_idx" ON "_pages_faq_v" USING btree ("_order");
  CREATE INDEX "_pages_faq_v_parent_id_idx" ON "_pages_faq_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_faq_v_path_idx" ON "_pages_faq_v" USING btree ("_path");
  CREATE INDEX "_pages_coins_v_order_idx" ON "_pages_coins_v" USING btree ("_order");
  CREATE INDEX "_pages_coins_v_parent_id_idx" ON "_pages_coins_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_coins_v_path_idx" ON "_pages_coins_v" USING btree ("_path");
  CREATE INDEX "_pages_coins_v_trade_coin_idx" ON "_pages_coins_v" USING btree ("trade_coin_id");
  CREATE INDEX "_pages_services_v_order_idx" ON "_pages_services_v" USING btree ("_order");
  CREATE INDEX "_pages_services_v_parent_id_idx" ON "_pages_services_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_services_v_path_idx" ON "_pages_services_v" USING btree ("_path");
  CREATE INDEX "_pages_steps_v_order_idx" ON "_pages_steps_v" USING btree ("_order");
  CREATE INDEX "_pages_steps_v_parent_id_idx" ON "_pages_steps_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_steps_v_path_idx" ON "_pages_steps_v" USING btree ("_path");
  CREATE INDEX "_pages_steps_v_step_idx" ON "_pages_steps_v" USING btree ("step_id");
  CREATE INDEX "_pages_hero_v_order_idx" ON "_pages_hero_v" USING btree ("_order");
  CREATE INDEX "_pages_hero_v_parent_id_idx" ON "_pages_hero_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_hero_v_path_idx" ON "_pages_hero_v" USING btree ("_path");
  CREATE INDEX "_pages_hero_v_hero_idx" ON "_pages_hero_v" USING btree ("hero_id");
  CREATE INDEX "_pages_header_v_order_idx" ON "_pages_header_v" USING btree ("_order");
  CREATE INDEX "_pages_header_v_parent_id_idx" ON "_pages_header_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_header_v_path_idx" ON "_pages_header_v" USING btree ("_path");
  CREATE INDEX "_pages_content_v_order_idx" ON "_pages_content_v" USING btree ("_order");
  CREATE INDEX "_pages_content_v_parent_id_idx" ON "_pages_content_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_content_v_path_idx" ON "_pages_content_v" USING btree ("_path");
  CREATE INDEX "_pages_content_v_image_idx" ON "_pages_content_v" USING btree ("image_id");
  CREATE INDEX "_pages_contact_v_contacts_order_idx" ON "_pages_contact_v_contacts" USING btree ("_order");
  CREATE INDEX "_pages_contact_v_contacts_parent_id_idx" ON "_pages_contact_v_contacts" USING btree ("_parent_id");
  CREATE INDEX "_pages_contact_v_community_order_idx" ON "_pages_contact_v_community" USING btree ("_order");
  CREATE INDEX "_pages_contact_v_community_parent_id_idx" ON "_pages_contact_v_community" USING btree ("_parent_id");
  CREATE INDEX "_pages_contact_v_order_idx" ON "_pages_contact_v" USING btree ("_order");
  CREATE INDEX "_pages_contact_v_parent_id_idx" ON "_pages_contact_v" USING btree ("_parent_id");
  CREATE INDEX "_pages_contact_v_path_idx" ON "_pages_contact_v" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_meta_image_idx" ON "_pages_v" USING btree ("version_seo_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "_pages_v_rels_faqs_id_idx" ON "_pages_v_rels" USING btree ("faqs_id");
  CREATE INDEX "_pages_v_rels_logos_id_idx" ON "_pages_v_rels" USING btree ("logos_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "articles_image_idx" ON "articles" USING btree ("image_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_categories_id_idx" ON "articles_rels" USING btree ("categories_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_image_idx" ON "_articles_v" USING btree ("version_image_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_categories_id_idx" ON "_articles_v_rels" USING btree ("categories_id");
  CREATE UNIQUE INDEX "categories_name_idx" ON "categories" USING btree ("name");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "categories_rels_order_idx" ON "categories_rels" USING btree ("order");
  CREATE INDEX "categories_rels_parent_idx" ON "categories_rels" USING btree ("parent_id");
  CREATE INDEX "categories_rels_path_idx" ON "categories_rels" USING btree ("path");
  CREATE INDEX "categories_rels_faqs_id_idx" ON "categories_rels" USING btree ("faqs_id");
  CREATE INDEX "faqs_category_idx" ON "faqs" USING btree ("category_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "heroes_updated_at_idx" ON "heroes" USING btree ("updated_at");
  CREATE INDEX "heroes_created_at_idx" ON "heroes" USING btree ("created_at");
  CREATE INDEX "logos_image_idx" ON "logos" USING btree ("image_id");
  CREATE INDEX "logos_updated_at_idx" ON "logos" USING btree ("updated_at");
  CREATE INDEX "logos_created_at_idx" ON "logos" USING btree ("created_at");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "steps_steps_order_idx" ON "steps_steps" USING btree ("_order");
  CREATE INDEX "steps_steps_parent_id_idx" ON "steps_steps" USING btree ("_parent_id");
  CREATE INDEX "steps_updated_at_idx" ON "steps" USING btree ("updated_at");
  CREATE INDEX "steps_created_at_idx" ON "steps" USING btree ("created_at");
  CREATE INDEX "testimonials_user_user_image_idx" ON "testimonials" USING btree ("user_image_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "trade_coins_updated_at_idx" ON "trade_coins" USING btree ("updated_at");
  CREATE INDEX "trade_coins_created_at_idx" ON "trade_coins" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_heroes_id_idx" ON "payload_locked_documents_rels" USING btree ("heroes_id");
  CREATE INDEX "payload_locked_documents_rels_logos_id_idx" ON "payload_locked_documents_rels" USING btree ("logos_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_steps_id_idx" ON "payload_locked_documents_rels" USING btree ("steps_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_trade_coins_id_idx" ON "payload_locked_documents_rels" USING btree ("trade_coins_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "global_navbar_items_items_order_idx" ON "global_navbar_items_items" USING btree ("_order");
  CREATE INDEX "global_navbar_items_items_parent_id_idx" ON "global_navbar_items_items" USING btree ("_parent_id");
  CREATE INDEX "global_navbar_items_order_idx" ON "global_navbar_items" USING btree ("_order");
  CREATE INDEX "global_navbar_items_parent_id_idx" ON "global_navbar_items" USING btree ("_parent_id");
  CREATE INDEX "global_footer_columns_items_order_idx" ON "global_footer_columns_items" USING btree ("_order");
  CREATE INDEX "global_footer_columns_items_parent_id_idx" ON "global_footer_columns_items" USING btree ("_parent_id");
  CREATE INDEX "global_footer_columns_order_idx" ON "global_footer_columns" USING btree ("_order");
  CREATE INDEX "global_footer_columns_parent_id_idx" ON "global_footer_columns" USING btree ("_parent_id");
  CREATE INDEX "global_contact_social_media_links_order_idx" ON "global_contact_social_media_links" USING btree ("_order");
  CREATE INDEX "global_contact_social_media_links_parent_id_idx" ON "global_contact_social_media_links" USING btree ("_parent_id");
  CREATE INDEX "global_seo_seo_meta_image_idx" ON "global" USING btree ("seo_meta_image_id");
  CREATE INDEX "global_navbar_navbar_logo_idx" ON "global" USING btree ("navbar_logo_id");
  CREATE INDEX "global_footer_footer_logo_idx" ON "global" USING btree ("footer_logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_testimonials" CASCADE;
  DROP TABLE "pages_faq" CASCADE;
  DROP TABLE "pages_coins" CASCADE;
  DROP TABLE "pages_services" CASCADE;
  DROP TABLE "pages_steps" CASCADE;
  DROP TABLE "pages_hero" CASCADE;
  DROP TABLE "pages_header" CASCADE;
  DROP TABLE "pages_content" CASCADE;
  DROP TABLE "pages_contact_contacts" CASCADE;
  DROP TABLE "pages_contact_community" CASCADE;
  DROP TABLE "pages_contact" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_testimonials_v" CASCADE;
  DROP TABLE "_pages_faq_v" CASCADE;
  DROP TABLE "_pages_coins_v" CASCADE;
  DROP TABLE "_pages_services_v" CASCADE;
  DROP TABLE "_pages_steps_v" CASCADE;
  DROP TABLE "_pages_hero_v" CASCADE;
  DROP TABLE "_pages_header_v" CASCADE;
  DROP TABLE "_pages_content_v" CASCADE;
  DROP TABLE "_pages_contact_v_contacts" CASCADE;
  DROP TABLE "_pages_contact_v_community" CASCADE;
  DROP TABLE "_pages_contact_v" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_rels" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "heroes" CASCADE;
  DROP TABLE "logos" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "steps_steps" CASCADE;
  DROP TABLE "steps" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "trade_coins" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "global_navbar_items_items" CASCADE;
  DROP TABLE "global_navbar_items" CASCADE;
  DROP TABLE "global_footer_columns_items" CASCADE;
  DROP TABLE "global_footer_columns" CASCADE;
  DROP TABLE "global_contact_social_media_links" CASCADE;
  DROP TABLE "global" CASCADE;
  DROP TYPE "public"."enum_pages_contact_contacts_button_target";
  DROP TYPE "public"."enum_pages_contact_community_button_target";
  DROP TYPE "public"."enum_pages_contact_community_button_variant";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_contact_v_contacts_button_target";
  DROP TYPE "public"."enum__pages_contact_v_community_button_target";
  DROP TYPE "public"."enum__pages_contact_v_community_button_variant";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_services_live_support_card_span";
  DROP TYPE "public"."enum_services_market_rate_card_span";
  DROP TYPE "public"."enum_services_secure_card_span";
  DROP TYPE "public"."enum_services_transaction_card_span";
  DROP TYPE "public"."enum_global_navbar_items_items_target";
  DROP TYPE "public"."enum_global_navbar_items_key";
  DROP TYPE "public"."enum_global_footer_columns_items_target";
  DROP TYPE "public"."enum_global_footer_columns_key";
  DROP TYPE "public"."enum_global_contact_social_media_links_target";`)
}
