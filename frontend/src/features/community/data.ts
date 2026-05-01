export type CommunityPostType = 'question' | 'doubt' | 'share'

export interface CommunityGroup {
  slug: string
  name: string
  description: string
  members: number
  posts: number
  tags: string[]
}

export interface CommunityPost {
  id: string
  author: string
  title: string
  body: string
  type: CommunityPostType
  createdAt: string
  replies: number
  likes: number
}

export const COMMUNITY_GROUPS: CommunityGroup[] = [
  {
    slug: 'healthy-food',
    name: 'Healthy Food',
    description: 'Clean eating, meal prep, and balanced plates for everyday cooks.',
    members: 1240,
    posts: 86,
    tags: ['meal-prep', 'low-sugar', 'high-protein'],
  },
  {
    slug: 'vegan',
    name: 'Vegan',
    description: 'Plant-based recipes, swaps, and nutrition tips without compromise.',
    members: 980,
    posts: 72,
    tags: ['plant-based', 'dairy-free', 'egg-free'],
  },
  {
    slug: 'non-veg',
    name: 'Non-Veg',
    description: 'Meat and seafood lovers sharing marinades, grills, and comfort food.',
    members: 1530,
    posts: 104,
    tags: ['chicken', 'seafood', 'grill'],
  },
]

export const COMMUNITY_POSTS: Record<string, CommunityPost[]> = {
  'healthy-food': [
    {
      id: 'hf-1',
      author: 'Riya M',
      title: 'Quick lunch ideas under 400 calories?',
      body: 'Looking for weekday lunches that are filling but still under 400 calories. Any go-to combos?',
      type: 'question',
      createdAt: '2h ago',
      replies: 8,
      likes: 14,
    },
    {
      id: 'hf-2',
      author: 'Marcus T',
      title: 'High-protein snacks that are not bars',
      body: 'I am bored of protein bars. What snacks do you all prep for work?',
      type: 'doubt',
      createdAt: '1d ago',
      replies: 12,
      likes: 22,
    },
  ],
  vegan: [
    {
      id: 'vg-1',
      author: 'Sana K',
      title: 'Best egg replacement for baking muffins?',
      body: 'I have tried flax eggs and applesauce. Any other favorites that keep muffins fluffy?',
      type: 'question',
      createdAt: '4h ago',
      replies: 6,
      likes: 10,
    },
    {
      id: 'vg-2',
      author: 'Luis A',
      title: 'Sharing my tofu stir-fry base',
      body: 'Tamari + garlic + ginger + a dash of maple. Works great with broccoli and mushrooms.',
      type: 'share',
      createdAt: '2d ago',
      replies: 4,
      likes: 18,
    },
  ],
  'non-veg': [
    {
      id: 'nv-1',
      author: 'Ishaan P',
      title: 'How long to marinate chicken for grilling?',
      body: 'Is 2 hours enough or should I do overnight? Trying to keep it juicy.',
      type: 'question',
      createdAt: '3h ago',
      replies: 9,
      likes: 15,
    },
    {
      id: 'nv-2',
      author: 'Priya S',
      title: 'Seafood curry spice mix (family recipe)',
      body: 'Coriander, turmeric, fennel, red chili, and mustard seeds. Toast and grind fresh.',
      type: 'share',
      createdAt: '3d ago',
      replies: 5,
      likes: 21,
    },
  ],
}
