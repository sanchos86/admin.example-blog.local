import Category from '@/models/Category';
import Social from '@/models/Social';
import Tag from '@/models/Tag';

export interface Progress {
  [key: string]: boolean
}

export interface ProgressPayload {
  progressCode: string,
  isActive: boolean
}

export interface RootState {}

export interface CommonState {
  progress: Progress,
  language: string
}

export interface CategoriesState {
  categories: Category[]
}

export interface TagsState {
  tags: Tag[]
}

export interface SocialsState {
  socials: Social[]
}
