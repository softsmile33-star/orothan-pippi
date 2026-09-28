import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';
export const inquiries=sqliteTable('inquiries',{id:text('id').primaryKey(),program:text('program').notNull(),name:text('name').notNull(),contact:text('contact').notNull(),organization:text('organization').notNull(),message:text('message').notNull(),consentAt:integer('consent_at').notNull(),createdAt:integer('created_at').notNull(),ipHash:text('ip_hash').notNull()},t=>[index('idx_inquiries_created').on(t.createdAt),index('idx_inquiries_rate').on(t.ipHash,t.createdAt)]);
export const inquiryDeliveries=sqliteTable('inquiry_deliveries',{id:text('id').primaryKey(),state:text('state').notNull(),createdAt:integer('created_at').notNull()});
export const lectureReviews=sqliteTable('lecture_reviews',{
  id:text('id').primaryKey(),
  name:text('name').notNull(),
  lecture:text('lecture').notNull(),
  organization:text('organization').notNull(),
  rating:integer('rating').notNull(),
  review:text('review').notNull(),
  publishConsent:integer('publish_consent').notNull(),
  privacyConsentAt:integer('privacy_consent_at').notNull(),
  status:text('status').notNull().default('pending'),
  createdAt:integer('created_at').notNull(),
  ipHash:text('ip_hash').notNull()
},t=>[index('idx_lecture_reviews_created').on(t.createdAt),index('idx_lecture_reviews_rate').on(t.ipHash,t.createdAt)]);
