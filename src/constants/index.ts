import { FC } from 'react';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

export const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/Physics.Association.BITSPilani/',
    icon: FaFacebook,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/physicsassociationbitspilani',
    icon: FaLinkedin,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/bits_phyassoc/',
    icon: FaInstagram,
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/channel/UCh81x2kZQHc64xVwWAmCKWQ',
    icon: FaYoutube,
  },
];

export const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: 'https://bitsphyassoc.github.io/blog' },
  { label: 'Short Posts', href: 'https://www.instagram.com/bits_phyassoc/' },
];

export const featuredArticles = [
  {
    id: 1,
    title: 'Errors and Error Correction in the Quantum World',
    description:
      'Quantum Computers offer a robust model of computing but are hard to build. Read on to learn about some sources of quantum errors and ways to overcome them.',
    author: 'Uday Singla',
    image:
      'https://raw.githubusercontent.com/bitsphyassoc/blog/master/images/blog/4-error/title.jpeg',
    url: 'https://bitsphyassoc.github.io/blog/quantum%20computation/errors/bloch%20sphere/2021/09/04/quantum-error.html',
  },
  {
    id: 2,
    title: 'Hyperspace',
    description:
      'In search of a Grand Unified Theory for physics, we need to search deeper, in new dimensions.',
    author: 'Aryan Singh',
    image:
      'https://media.istockphoto.com/photos/abstract-blue-flight-in-space-hyper-jump-3d-rendering-picture-id1288036111?k=20&m=1288036111&s=612x612&w=0&h=Nmjm1IeQQb2oAQhnfvlhbTelZar5s1x7dTpD-1M4rik=',
    url: 'https://bitsphyassoc.github.io/blog/alternate%20dimensions/speed%20of%20light/einstein%E2%80%99s%20field%20equations/2022/02/02/Hyperspace.html',
  },
  {
    id: 3,
    title: 'A primer to the Standard Model',
    description:
      'Let me introduce you to one of the most successful models in particle physics - The Standard Model',
    author: 'Abhinav Choudhary',
    image:
      'https://physicsworld.com/wp-content/uploads/2020/04/Martina-Hestericova-3-April-Quantum-computing-for-high-energy-physics_authorized.jpg',
    url: 'https://bitsphyassoc.github.io/blog/particle%20physics/standard%20model/elementary%20particles/universe/2021/08/16/standard-model.html',
  },
];

export const quotes = [
  {
    text: 'God does not play dice',
    author: 'Albert Einstein',
  },
  {
    text: "Don't tell me what to do",
    author: 'God',
  },
  {
    text: 'If you want to master something, teach it!',
    author: 'Richard Feynman',
  },
];

export const aboutContent = {
  title: 'About Us',
  description:
    'We are a bunch of nerds trying to promote the beautiful language of physics in all of its true glory. We have a swanky team of students from BITS Pilani, Pilani Campus. We provide quality content through our blog and engaging Instagram posts explaining cool physics phenomena. Be sure to check all of these and follow all of our socials for the latest updates on our work!',
  image:
    'https://raw.githubusercontent.com/bitsphyassoc/bitsphyassoc.github.io/main/assets/images/feature-image.jpg',
};
