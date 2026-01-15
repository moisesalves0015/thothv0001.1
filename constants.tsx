
import { Post } from './types';

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: {
      id: 'a1',
      name: 'Robert Fox',
      username: '@alessandroveronezi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
      verified: true
    },
    content: 'Embora Corfu nos dê a capacidade de fotografar à beira-mar com fundos azuis incríveis cheios de luz do céu, Florina nos mostra seu lado suave. A atmosfera humilde e a Luz de Florina que vem...',
    timestamp: '15m atrás',
    likes: 1600,
    replies: 2300,
    tags: ['paisagem', 'flora', 'natureza', 'fotografia', 'viagem', 'arte', 'luz'],
    images: [
      'https://picsum.photos/seed/corfu1/600/600',
      'https://picsum.photos/seed/corfu2/300/300',
      'https://picsum.photos/seed/corfu3/300/300',
      'https://picsum.photos/seed/corfu4/300/300',
      'https://picsum.photos/seed/corfu5/300/300',
      'https://picsum.photos/seed/corfu6/300/300'
    ]
  },
  {
    id: '2',
    author: {
      id: 'a2',
      name: 'Dianne Russell',
      username: '@amandadasilva',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dianne',
    },
    content: 'Observando a vida selvagem local no quintal. A natureza é verdadeiramente fascinante quando você olha de perto.',
    timestamp: '1h atrás',
    likes: 856,
    replies: 42,
    tags: ['natureza', 'wildlife'],
    images: [
      'https://picsum.photos/seed/cat/600/400'
    ]
  },
  {
    id: '3',
    author: {
      id: 'a3',
      name: 'Azuki Garden',
      username: '@azuki_official',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Azuki',
      verified: true
    },
    content: 'Nova coleção de arte digital explorando tons pastéis e texturas orgânicas.',
    timestamp: '3h atrás',
    likes: 1200,
    replies: 154,
    tags: ['art', 'nft', 'digital', 'design', 'creative', 'pastel', 'minimalist'],
    images: [
      'https://picsum.photos/seed/azuki1/400/400',
      'https://picsum.photos/seed/azuki2/200/200',
      'https://picsum.photos/seed/azuki3/200/200'
    ]
  },
  {
    id: '4',
    author: {
      id: 'a4',
      name: 'Moisés Silva',
      username: '@moises_dev',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Moisés',
    },
    content: 'Testando a nova interface do Thoth. O sistema de grid está ficando excelente para visualização de portfólios.',
    timestamp: '5h atrás',
    likes: 450,
    replies: 12,
    tags: ['ui', 'ux', 'thoth', 'frontend', 'react', 'tailwind', 'pixels', 'designsystem', 'coding'],
    images: [
      'https://picsum.photos/seed/code/600/600',
      'https://picsum.photos/seed/office/300/300'
    ]
  },
  {
    id: '5',
    author: {
      id: 'a5',
      name: 'Carla Rocha',
      username: '@carla_arch',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carla',
      verified: true
    },
    content: 'Inspiração matinal: a luz filtrada pelas cobogós cria padrões geométricos incríveis no chão da sala.',
    timestamp: '8h atrás',
    likes: 2300,
    replies: 89,
    tags: ['arquitetura', 'luz', 'geometric', 'interior', 'decor', 'morning'],
    images: [
      'https://picsum.photos/seed/arch1/600/600',
      'https://picsum.photos/seed/arch2/300/300',
      'https://picsum.photos/seed/arch3/300/300',
      'https://picsum.photos/seed/arch4/300/300',
      'https://picsum.photos/seed/arch5/300/300'
    ]
  }
];
