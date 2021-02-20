import { Service } from 'typedi';

import tokens from '@/services/tokens';

@Service(tokens.POSTS_SERVICE)
export default class PostsService {}
