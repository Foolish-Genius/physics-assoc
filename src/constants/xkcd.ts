export interface XkcdComic {
  id: number;
  title: string;
  alt: string;
  src: string;
  xkcdUrl: string;
  width: number;
  height: number;
  tagline?: string;
}

export const XKCD_COMICS: Record<string, XkcdComic> = {
  purity: {
    id: 435,
    title: 'Purity',
    alt: 'On the other hand, physicists like to say physics is to math as sex is to masturbation.',
    src: '/images/xkcd/435.png',
    xkcdUrl: 'https://xkcd.com/435/',
    width: 740,
    height: 308,
    tagline: 'Fields arranged by purity',
  },
  physicists: {
    id: 793,
    title: 'Physicists',
    alt: "If you need some help with the math, let me know, but that should be enough to get you started! Huh? No, I don't need to read your thesis, I can imagine roughly what it says.",
    src: '/images/xkcd/793.png',
    xkcdUrl: 'https://xkcd.com/793/',
    width: 358,
    height: 540,
    tagline: 'Assuming a spherical cow in a vacuum...',
  },
  centrifugalForce: {
    id: 123,
    title: 'Centrifugal Force',
    alt: 'You spin me right round, baby, right round, in a manner depriving me of an inertial reference frame. Baby.',
    src: '/images/xkcd/123.png',
    xkcdUrl: 'https://xkcd.com/123/',
    width: 400,
    height: 595,
    tagline: 'In a rotating reference frame, Mr. Bond',
  },
  fundamentalForces: {
    id: 1489,
    title: 'Fundamental Forces',
    alt: '"Of these four forces, there\'s one we don\'t really understand." "Is it the weak force or the strong--" "It\'s gravity."',
    src: '/images/xkcd/1489.png',
    xkcdUrl: 'https://xkcd.com/1489/',
    width: 740,
    height: 282,
    tagline: 'The four fundamental forces',
  },
  teachingPhysics: {
    id: 895,
    title: 'Teaching Physics',
    alt: "Space-time is like some simple and familiar system which is both intuitively understandable and precisely analogous, and if I were Richard Feynman I'd be able to come up with it.",
    src: '/images/xkcd/895.png',
    xkcdUrl: 'https://xkcd.com/895/',
    width: 692,
    height: 313,
    tagline: 'Space-time analogy',
  },
  nerdSniping: {
    id: 356,
    title: 'Nerd Sniping',
    alt: 'I first saw this problem on the Google Labs Aptitude Test. A professor and I filled a blackboard without getting anywhere. Have fun.',
    src: '/images/xkcd/356.png',
    xkcdUrl: 'https://xkcd.com/356/',
    width: 740,
    height: 371,
    tagline: 'Infinite grid of resistors',
  },
};
