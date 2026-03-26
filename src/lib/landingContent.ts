import type { Copy, Locale } from './i18nCopy';

export type LandingContent = {
  hero: {
    badge: string;
    slides: Array<{ image: string; title: string; subtitle: string }>;
    searchPlaceholder: string;
    ctaExplore: string;
    ctaTrack: string;
  };
  sections: {
    featuredTitle: string;
    featuredSubtitle: string;
    liveStatusTitle: string;
    liveStatusSubtitle: string;
    popularTitle: string;
    popularSubtitle: string;
    howTitle: string;
    howSubtitle: string;
    howSteps: Array<{ n: string; title: string; desc: string }>;
    testimonialsTitle: string;
    testimonials: Array<{ name: string; city: string; text: string }>;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
};

const DEFAULT_SLIDE_IMAGES = [
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1600&auto=format&fit=crop&q=70',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&auto=format&fit=crop&q=70',
] as const;

export function buildDefaultLandingContent(copy: Copy): LandingContent {
  return {
    hero: {
      badge: copy.heroBadge,
      slides: [
        { image: DEFAULT_SLIDE_IMAGES[0], title: copy.heroTitle1, subtitle: copy.heroSubtitle1 },
        { image: DEFAULT_SLIDE_IMAGES[1], title: copy.heroTitle2, subtitle: copy.heroSubtitle2 },
        { image: DEFAULT_SLIDE_IMAGES[2], title: copy.heroTitle3, subtitle: copy.heroSubtitle3 },
      ],
      searchPlaceholder: copy.searchPlaceholder,
      ctaExplore: copy.ctaExplore,
      ctaTrack: copy.ctaTrack,
    },
    sections: {
      featuredTitle: copy.sectionFeatured,
      featuredSubtitle: copy.sectionFeaturedSubtitle,
      liveStatusTitle: copy.liveStatusTitle,
      liveStatusSubtitle: copy.liveStatusSubtitle,
      popularTitle: copy.sectionPopular,
      popularSubtitle: copy.sectionPopularSubtitle,
      howTitle: copy.sectionHow,
      howSubtitle: copy.howSubtitle,
      howSteps: [
        { n: '01', title: copy.howStep1Title, desc: copy.howStep1Desc },
        { n: '02', title: copy.howStep2Title, desc: copy.howStep2Desc },
        { n: '03', title: copy.howStep3Title, desc: copy.howStep3Desc },
      ],
      testimonialsTitle: copy.sectionTestimonials,
      testimonials: [
        { name: 'Aminata D.', city: 'Paris', text: copy.testimonial1Text },
        { name: 'Pedro M.', city: 'Lyon', text: copy.testimonial2Text },
        { name: 'Fatima B.', city: 'Grenoble', text: copy.testimonial3Text },
      ],
      ctaTitle: copy.ctaReadyTitle,
      ctaSubtitle: copy.ctaReadySubtitle,
      ctaPrimary: copy.startOrdering,
      ctaSecondary: copy.registerTitle,
    },
  };
}

export function mergeLandingContent(base: LandingContent, incoming: unknown): LandingContent {
  if (!incoming || typeof incoming !== 'object') return base;
  const c = incoming as Partial<LandingContent>;
  return {
    hero: {
      badge: c.hero?.badge ?? base.hero.badge,
      slides: Array.isArray(c.hero?.slides) && c.hero!.slides.length >= 1
        ? c.hero!.slides
            .filter((s) => s && typeof s.image === 'string' && typeof s.title === 'string' && typeof s.subtitle === 'string')
            .slice(0, 6) as LandingContent['hero']['slides']
        : base.hero.slides,
      searchPlaceholder: c.hero?.searchPlaceholder ?? base.hero.searchPlaceholder,
      ctaExplore: c.hero?.ctaExplore ?? base.hero.ctaExplore,
      ctaTrack: c.hero?.ctaTrack ?? base.hero.ctaTrack,
    },
    sections: {
      featuredTitle: c.sections?.featuredTitle ?? base.sections.featuredTitle,
      featuredSubtitle: c.sections?.featuredSubtitle ?? base.sections.featuredSubtitle,
      liveStatusTitle: c.sections?.liveStatusTitle ?? base.sections.liveStatusTitle,
      liveStatusSubtitle: c.sections?.liveStatusSubtitle ?? base.sections.liveStatusSubtitle,
      popularTitle: c.sections?.popularTitle ?? base.sections.popularTitle,
      popularSubtitle: c.sections?.popularSubtitle ?? base.sections.popularSubtitle,
      howTitle: c.sections?.howTitle ?? base.sections.howTitle,
      howSubtitle: c.sections?.howSubtitle ?? base.sections.howSubtitle,
      howSteps: Array.isArray(c.sections?.howSteps) && c.sections!.howSteps.length
        ? c.sections!.howSteps.slice(0, 6) as LandingContent['sections']['howSteps']
        : base.sections.howSteps,
      testimonialsTitle: c.sections?.testimonialsTitle ?? base.sections.testimonialsTitle,
      testimonials: Array.isArray(c.sections?.testimonials) && c.sections!.testimonials.length
        ? c.sections!.testimonials.slice(0, 6) as LandingContent['sections']['testimonials']
        : base.sections.testimonials,
      ctaTitle: c.sections?.ctaTitle ?? base.sections.ctaTitle,
      ctaSubtitle: c.sections?.ctaSubtitle ?? base.sections.ctaSubtitle,
      ctaPrimary: c.sections?.ctaPrimary ?? base.sections.ctaPrimary,
      ctaSecondary: c.sections?.ctaSecondary ?? base.sections.ctaSecondary,
    },
  };
}

export type LandingContentRow = {
  locale: Locale;
  content: LandingContent;
  is_active: boolean;
};

