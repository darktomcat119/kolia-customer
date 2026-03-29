export type Locale = 'en' | 'fr' | 'pt';

export const STORAGE_KEY = 'kolia-customer-locale';

export type Copy = {
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroSubtitle1: string;
  heroSubtitle2: string;
  heroSubtitle3: string;
  searchPlaceholder: string;
  ctaExplore: string;
  ctaTrack: string;
  sectionFeatured: string;
  sectionPopular: string;
  sectionHow: string;
  sectionTestimonials: string;
  loginTitle: string;
  loginSubtitle: string;
  loginEmail: string;
  loginPassword: string;
  loginContinue: string;
  loginSigningIn: string;
  loginForgot: string;
  loginNoAccount: string;
  loginCreateOne: string;
  loginPasswordResetSent: string;
  loginFailed: string;
  registerTitle: string;
  registerSubtitle: string;
  registerFullName: string;
  registerEmail: string;
  registerPassword: string;
  registerCreate: string;
  registerCreating: string;
  registerResend: string;
  registerHaveAccount: string;
  registerLogin: string;
  registerCheckInbox: string;
  registerConfirmResent: string;
  registerFailed: string;
  forgotPasswordFailed: string;
  checkoutTitle: string;
  checkoutSubtitle: string;
  checkoutOrderType: string;
  checkoutDelivery: string;
  checkoutPickup: string;
  checkoutNotes: string;
  checkoutNotesPlaceholder: string;
  checkoutCreateOrder: string;
  checkoutCreatingOrder: string;
  checkoutPaymentReady: string;
  checkoutPaymentTitle: string;
  checkoutPaySecurely: string;
  checkoutProcessing: string;
  checkoutSubtotal: string;
  checkoutDeliveryFee: string;
  checkoutTotal: string;
  ordersTitle: string;
  ordersEmpty: string;
  ordersLoadFailed: string;
  navHome: string;
  navExplore: string;
  navCart: string;
  navProfile: string;
  navLogout: string;
  navLogin: string;
  brandCustomer: string;
  langLabel: string;
  langEn: string;
  langFr: string;
  langPt: string;
  sectionFeaturedSubtitle: string;
  viewAll: string;
  liveStatusTitle: string;
  liveStatusSubtitle: string;
  sectionPopularSubtitle: string;
  browse: string;
  howSubtitle: string;
  stepPrefix: string;
  howStep1Title: string;
  howStep1Desc: string;
  howStep2Title: string;
  howStep2Desc: string;
  howStep3Title: string;
  howStep3Desc: string;
  ctaReadyTitle: string;
  ctaReadySubtitle: string;
  startOrdering: string;
  heroSlideAria: string;
  cuisineAll: string;
  cuisineWestAfrican: string;
  cuisineCongolese: string;
  cuisineNorthAfrican: string;
  cuisineCentralAfrican: string;
  cuisineSouthernAfrican: string;
  cuisineLusophone: string;
  cuisinePanAfrican: string;
  tagPopular: string;
  tagChefPick: string;
  tagTrending: string;
  testimonial1Text: string;
  testimonial2Text: string;
  testimonial3Text: string;
  activeOrderLabel: string;
  orderStatusOnTheWay: string;
  orderRestaurantLabel: string;
  orderEtaLabel: string;
  activeTrackOrder: string;
  activeReorderBtn: string;
  reorderSectionLabel: string;
  reorderFavoritesTitle: string;
  reorderFavoritesSubtitle: string;
  addToFavorites: string;
  removeFromFavorites: string;
  discountBadge: string;
  browseRestaurantsBtn: string;
  openCartBtn: string;
  cartTitle: string;
  cartSubtitle: string;
  cartEmpty: string;
  qtyDecrease: string;
  qtyIncrease: string;
  removeItem: string;
  totalLabel: string;
  clearCart: string;
  checkoutBtn: string;
  restaurantsTitle: string;
  restaurantsSubtitle: string;
  searchRestaurantsPlaceholder: string;
  restaurantsLoadFailed: string;
  noRestaurantsFound: string;
  restaurantLoadFailed: string;
  restaurantNotFound: string;
  restaurantDefaultBlurb: string;
  cartSwitchWarning: string;
  cartSwitchConfirmTitle: string;
  cartSwitchConfirmBody: string;
  cartSwitchConfirmOk: string;
  cartSwitchConfirmCancel: string;
  goToCart: string;
  menuNotAvailable: string;
  addToCart: string;
  menuItemFallbackDesc: string;
  profileTitle: string;
  profileSubtitle: string;
  profileSignedInAs: string;
  profileViewOrders: string;
  authAsideTitle: string;
  authAsideSubtitle: string;
  authConfirmInvalidTitle: string;
  authConfirmInvalidBody: string;
  authGoLogin: string;
  authBackHome: string;
  authConfirming: string;
  authFinishingSignIn: string;
  resetTitle: string;
  resetSubtitle: string;
  resetNewPassword: string;
  resetUpdate: string;
  resetSaving: string;
  resetFailed: string;
  checkoutCartEmpty: string;
  checkoutLoginPrompt: string;
  checkoutPaymentLoadHint: string;
  checkoutOrderCreateFailed: string;
  checkoutPaymentFailed: string;
  checkoutGuestTitle: string;
  ordersRestaurantFallback: string;
  ordersMoreItems: string;
  errorBoundaryTitle: string;
  errorBoundaryHint: string;
  errorBoundaryRefresh: string;
  openDishAria: string;
  popularCarouselPrev: string;
  popularCarouselNext: string;
  popularCarouselDotAria: string;
  reviewCta: string;
  reviewTitle: string;
  reviewSubtitle: string;
  reviewPlaceholder: string;
  reviewSubmit: string;
  reviewSubmitting: string;
  reviewThanks: string;
  reviewFailed: string;
};

function readForcedEnvLocale(): Locale | null {
  const forced = (import.meta.env.VITE_LOCALE as string | undefined)?.trim().toLowerCase();
  if (forced === 'fr' || forced === 'pt' || forced === 'en') return forced;
  return null;
}

export function isLocaleLocked(): boolean {
  return readForcedEnvLocale() !== null;
}

export function detectBrowserLocale(): Locale {
  const lang = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en';
  if (lang.startsWith('fr')) return 'fr';
  if (lang.startsWith('pt')) return 'pt';
  return 'en';
}

export function getInitialLocale(): Locale {
  const env = readForcedEnvLocale();
  if (env) return env;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'en' || raw === 'fr' || raw === 'pt') return raw;
  } catch {
    /* noop */
  }
  return detectBrowserLocale();
}

export const COPY: Record<Locale, Copy> = {
  en: {
    heroBadge: 'Luxury delivery',
    heroTitle1: 'Authentic African cuisine, elevated',
    heroTitle2: 'Curated restaurants in your city',
    heroTitle3: 'Smooth ordering, secure payments',
    heroSubtitle1: 'Luxury delivery designed for food lovers',
    heroSubtitle2: 'Hand-picked kitchens and premium service',
    heroSubtitle3: 'From discovery to doorstep in minutes',
    searchPlaceholder: 'Search restaurants or dishes…',
    ctaExplore: 'Explore restaurants',
    ctaTrack: 'Track my order',
    sectionFeatured: 'Featured near you',
    sectionPopular: 'Popular right now',
    sectionHow: 'How it works',
    sectionTestimonials: 'Loved by customers',
    loginTitle: 'Welcome back',
    loginSubtitle: 'Sign in to continue your premium ordering experience.',
    loginEmail: 'Email',
    loginPassword: 'Password',
    loginContinue: 'Continue',
    loginSigningIn: 'Signing in…',
    loginForgot: 'Forgot password',
    loginNoAccount: 'No account?',
    loginCreateOne: 'Create one',
    loginPasswordResetSent: 'Password reset email sent. Check your inbox.',
    loginFailed: 'Login failed',
    registerTitle: 'Create account',
    registerSubtitle: 'Join Kolia and discover premium African cuisine near you.',
    registerFullName: 'Full name (optional)',
    registerEmail: 'Email',
    registerPassword: 'Password',
    registerCreate: 'Create',
    registerCreating: 'Creating…',
    registerResend: 'Resend confirmation email',
    registerHaveAccount: 'Already have an account?',
    registerLogin: 'Login',
    registerCheckInbox: 'Check your inbox to confirm your email, then come back to log in.',
    registerConfirmResent: 'Confirmation email resent.',
    registerFailed: 'Sign up failed',
    forgotPasswordFailed: 'Failed to send reset email',
    checkoutTitle: 'Checkout',
    checkoutSubtitle: 'Confirm details, then pay securely.',
    checkoutOrderType: 'Order type',
    checkoutDelivery: 'Delivery',
    checkoutPickup: 'Pickup',
    checkoutNotes: 'Notes (optional)',
    checkoutNotesPlaceholder: 'Allergies, delivery instructions…',
    checkoutCreateOrder: 'Create order',
    checkoutCreatingOrder: 'Creating order…',
    checkoutPaymentReady: 'Payment ready',
    checkoutPaymentTitle: 'Payment',
    checkoutPaySecurely: 'Pay securely',
    checkoutProcessing: 'Processing…',
    checkoutSubtotal: 'Subtotal',
    checkoutDeliveryFee: 'Delivery fee',
    checkoutTotal: 'Total',
    ordersTitle: 'Orders',
    ordersEmpty: 'No orders yet.',
    ordersLoadFailed: 'Failed to load orders',
    navHome: 'Home',
    navExplore: 'Explore',
    navCart: 'Cart',
    navProfile: 'Profile',
    navLogout: 'Logout',
    navLogin: 'Login',
    brandCustomer: 'Customer',
    langLabel: 'Language',
    langEn: 'English',
    langFr: 'Français',
    langPt: 'Português',
    sectionFeaturedSubtitle: 'Hand-picked restaurants with signature dishes.',
    viewAll: 'View all',
    liveStatusTitle: 'Live status',
    liveStatusSubtitle: 'Your current order at a glance.',
    sectionPopularSubtitle: 'Premium picks with fast checkout.',
    browse: 'Browse',
    howSubtitle: 'A premium flow from discovery to delivery.',
    stepPrefix: 'STEP',
    howStep1Title: 'Discover',
    howStep1Desc: 'Browse curated restaurants and dishes.',
    howStep2Title: 'Checkout',
    howStep2Desc: 'Pay securely with a smooth, modern flow.',
    howStep3Title: 'Enjoy',
    howStep3Desc: 'Track live status and receive your order.',
    ctaReadyTitle: 'Ready to order?',
    ctaReadySubtitle: 'Discover premium African cuisine and get it delivered fast.',
    startOrdering: 'Start ordering',
    heroSlideAria: 'Hero slide {n}',
    cuisineAll: 'All',
    cuisineWestAfrican: 'West African',
    cuisineCongolese: 'Congolese',
    cuisineNorthAfrican: 'North African',
    cuisineCentralAfrican: 'Central African',
    cuisineSouthernAfrican: 'Southern African',
    cuisineLusophone: 'Lusophone',
    cuisinePanAfrican: 'Pan-African',
    tagPopular: 'Popular',
    tagChefPick: 'Chef pick',
    tagTrending: 'Trending',
    testimonial1Text: 'Finally, authentic West African food delivered beautifully and on time.',
    testimonial2Text: 'The app feels premium and the dishes are consistently excellent.',
    testimonial3Text: 'Fast checkout, clear tracking, and amazing flavors every time.',
    activeOrderLabel: 'Active order',
    orderStatusOnTheWay: 'On the way',
    orderRestaurantLabel: 'Restaurant',
    orderEtaLabel: 'ETA',
    activeTrackOrder: 'Track order',
    activeReorderBtn: 'Reorder',
    reorderSectionLabel: 'Reorder',
    reorderFavoritesTitle: 'Your favorites',
    reorderFavoritesSubtitle: 'One-tap reorder from your recent restaurants.',
    addToFavorites: 'Save to favorites',
    removeFromFavorites: 'Remove from favorites',
    discountBadge: '-10%',
    browseRestaurantsBtn: 'Browse restaurants',
    openCartBtn: 'Open cart',
    cartTitle: 'Cart',
    cartSubtitle: 'Review your items before checkout.',
    cartEmpty: 'Your cart is empty.',
    qtyDecrease: 'Decrease quantity',
    qtyIncrease: 'Increase quantity',
    removeItem: 'Remove',
    totalLabel: 'Total',
    clearCart: 'Clear cart',
    checkoutBtn: 'Checkout',
    restaurantsTitle: 'Explore',
    restaurantsSubtitle: 'Find restaurants and discover signature dishes.',
    searchRestaurantsPlaceholder: 'Search restaurants by name or city…',
    restaurantsLoadFailed: 'Failed to load restaurants',
    noRestaurantsFound: 'No restaurants found.',
    restaurantLoadFailed: 'Failed to load restaurant',
    restaurantNotFound: 'Restaurant not found.',
    restaurantDefaultBlurb: 'Authentic flavors, premium experience.',
    cartSwitchWarning: 'Switching restaurants clears cart',
    cartSwitchConfirmTitle: 'Start a new order?',
    cartSwitchConfirmBody: 'Your current cart will be cleared. Do you want to continue?',
    cartSwitchConfirmOk: 'Yes, clear cart',
    cartSwitchConfirmCancel: 'Cancel',
    goToCart: 'Go to cart',
    menuNotAvailable: 'Menu not available yet.',
    addToCart: 'Add to cart',
    menuItemFallbackDesc: 'A premium classic, made with care.',
    profileTitle: 'Profile',
    profileSubtitle: 'Manage your account and track orders.',
    profileSignedInAs: 'Signed in as',
    profileViewOrders: 'View orders',
    authAsideTitle: 'Taste Africa in a premium way',
    authAsideSubtitle:
      'Curated restaurants, smooth checkout, and real-time tracking from kitchen to doorstep.',
    authConfirmInvalidTitle: 'Invalid or expired link',
    authConfirmInvalidBody:
      'Your confirmation link has expired or was already used. You can request a new email from the login page.',
    authGoLogin: 'Go to login',
    authBackHome: 'Back home',
    authConfirming: 'Confirming…',
    authFinishingSignIn: 'Finishing sign-in',
    resetTitle: 'Reset password',
    resetSubtitle: 'Choose a new password for your account.',
    resetNewPassword: 'New password',
    resetUpdate: 'Update password',
    resetSaving: 'Saving…',
    resetFailed: 'Failed to reset password',
    checkoutCartEmpty: 'Your cart is empty.',
    checkoutLoginPrompt: 'Please log in to place an order.',
    checkoutPaymentLoadHint: 'Tap “Create order” to load secure payment.',
    checkoutOrderCreateFailed: 'Failed to create order',
    checkoutPaymentFailed: 'Payment failed',
    checkoutGuestTitle: 'Checkout',
    ordersRestaurantFallback: 'Restaurant',
    ordersMoreItems: '+{count} more',
    errorBoundaryTitle: 'Something went wrong',
    errorBoundaryHint: 'Please refresh the page. If it keeps happening, contact support.',
    errorBoundaryRefresh: 'Refresh',
    openDishAria: 'Open {name}',
    popularCarouselPrev: 'Previous dish',
    popularCarouselNext: 'Next dish',
    popularCarouselDotAria: 'Go to dish {n}',
    reviewCta: 'Leave a review',
    reviewTitle: 'Rate your order',
    reviewSubtitle: 'Your feedback helps us improve and highlights the best restaurants.',
    reviewPlaceholder: 'Tell us what you loved (optional)…',
    reviewSubmit: 'Submit review',
    reviewSubmitting: 'Submitting…',
    reviewThanks: 'Thanks for your review!',
    reviewFailed: 'Failed to submit review',
  },
  fr: {
    heroBadge: 'Livraison premium',
    heroTitle1: 'Cuisine africaine authentique, sublimée',
    heroTitle2: 'Restaurants sélectionnés dans votre ville',
    heroTitle3: 'Commande fluide, paiement sécurisé',
    heroSubtitle1: 'Une expérience premium pour les amateurs de cuisine',
    heroSubtitle2: 'Cuisines choisies avec soin et service haut de gamme',
    heroSubtitle3: 'De la découverte à la livraison en quelques minutes',
    searchPlaceholder: 'Rechercher restaurants ou plats…',
    ctaExplore: 'Explorer les restaurants',
    ctaTrack: 'Suivre ma commande',
    sectionFeatured: 'Sélection près de chez vous',
    sectionPopular: 'Tendances du moment',
    sectionHow: 'Comment ça marche',
    sectionTestimonials: 'Adoré par nos clients',
    loginTitle: 'Bon retour',
    loginSubtitle: 'Connectez-vous pour poursuivre votre expérience premium.',
    loginEmail: 'E-mail',
    loginPassword: 'Mot de passe',
    loginContinue: 'Continuer',
    loginSigningIn: 'Connexion…',
    loginForgot: 'Mot de passe oublié',
    loginNoAccount: 'Pas de compte ?',
    loginCreateOne: 'Créer un compte',
    loginPasswordResetSent: 'E-mail de réinitialisation envoyé. Vérifiez votre boîte mail.',
    loginFailed: 'Échec de la connexion',
    registerTitle: 'Créer un compte',
    registerSubtitle:
      'Rejoignez Kolia et découvrez une cuisine africaine premium près de chez vous.',
    registerFullName: 'Nom complet (optionnel)',
    registerEmail: 'E-mail',
    registerPassword: 'Mot de passe',
    registerCreate: 'Créer',
    registerCreating: 'Création…',
    registerResend: 'Renvoyer l’e-mail de confirmation',
    registerHaveAccount: 'Vous avez déjà un compte ?',
    registerLogin: 'Connexion',
    registerCheckInbox:
      'Consultez votre boîte mail pour confirmer votre adresse, puis reconnectez-vous.',
    registerConfirmResent: 'E-mail de confirmation renvoyé.',
    registerFailed: 'Échec de l’inscription',
    forgotPasswordFailed: 'Échec de l’envoi de l’e-mail de réinitialisation',
    checkoutTitle: 'Paiement',
    checkoutSubtitle: 'Confirmez les détails puis payez en toute sécurité.',
    checkoutOrderType: 'Type de commande',
    checkoutDelivery: 'Livraison',
    checkoutPickup: 'À emporter',
    checkoutNotes: 'Notes (optionnel)',
    checkoutNotesPlaceholder: 'Allergies, consignes de livraison…',
    checkoutCreateOrder: 'Créer la commande',
    checkoutCreatingOrder: 'Création de la commande…',
    checkoutPaymentReady: 'Paiement prêt',
    checkoutPaymentTitle: 'Paiement',
    checkoutPaySecurely: 'Payer en sécurité',
    checkoutProcessing: 'Traitement…',
    checkoutSubtotal: 'Sous-total',
    checkoutDeliveryFee: 'Frais de livraison',
    checkoutTotal: 'Total',
    ordersTitle: 'Commandes',
    ordersEmpty: 'Aucune commande pour le moment.',
    ordersLoadFailed: 'Impossible de charger les commandes',
    navHome: 'Accueil',
    navExplore: 'Explorer',
    navCart: 'Panier',
    navProfile: 'Profil',
    navLogout: 'Déconnexion',
    navLogin: 'Connexion',
    brandCustomer: 'Client',
    langLabel: 'Langue',
    langEn: 'English',
    langFr: 'Français',
    langPt: 'Português',
    sectionFeaturedSubtitle: 'Restaurants et plats signatures soigneusement choisis.',
    viewAll: 'Tout voir',
    liveStatusTitle: 'Statut en direct',
    liveStatusSubtitle: 'Votre commande en cours en un coup d’œil.',
    sectionPopularSubtitle: 'Sélection premium avec paiement rapide.',
    browse: 'Parcourir',
    howSubtitle: 'Un parcours premium de la découverte à la livraison.',
    stepPrefix: 'ÉTAPE',
    howStep1Title: 'Découvrir',
    howStep1Desc: 'Parcourez des restaurants et plats sélectionnés.',
    howStep2Title: 'Paiement',
    howStep2Desc: 'Payez en toute sécurité avec un parcours fluide.',
    howStep3Title: 'Profiter',
    howStep3Desc: 'Suivez le statut et recevez votre commande.',
    ctaReadyTitle: 'Prêt à commander ?',
    ctaReadySubtitle:
      'Découvrez une cuisine africaine premium et faites-vous livrer rapidement.',
    startOrdering: 'Commencer',
    heroSlideAria: 'Diapositive du hero {n}',
    cuisineAll: 'Tous',
    cuisineWestAfrican: 'Afrique de l’Ouest',
    cuisineCongolese: 'Congolais',
    cuisineNorthAfrican: 'Afrique du Nord',
    cuisineCentralAfrican: 'Afrique centrale',
    cuisineSouthernAfrican: 'Afrique australe',
    cuisineLusophone: 'Lusophone',
    cuisinePanAfrican: 'Panafricain',
    tagPopular: 'Populaire',
    tagChefPick: 'Choix du chef',
    tagTrending: 'Tendance',
    testimonial1Text:
      'Enfin une cuisine ouest-africaine authentique, livrée avec soin et à l’heure.',
    testimonial2Text: 'L’application est premium et les plats toujours excellents.',
    testimonial3Text: 'Paiement rapide, suivi clair et saveurs incroyables à chaque fois.',
    activeOrderLabel: 'Commande active',
    orderStatusOnTheWay: 'En route',
    orderRestaurantLabel: 'Restaurant',
    orderEtaLabel: 'Délai',
    activeTrackOrder: 'Suivre',
    activeReorderBtn: 'Recommander',
    reorderSectionLabel: 'Recommander',
    reorderFavoritesTitle: 'Vos favoris',
    reorderFavoritesSubtitle: 'Recommandez en un geste depuis vos dernières adresses.',
    addToFavorites: 'Ajouter aux favoris',
    removeFromFavorites: 'Retirer des favoris',
    discountBadge: '-10 %',
    browseRestaurantsBtn: 'Parcourir les restaurants',
    openCartBtn: 'Ouvrir le panier',
    cartTitle: 'Panier',
    cartSubtitle: 'Vérifiez vos articles avant le paiement.',
    cartEmpty: 'Votre panier est vide.',
    qtyDecrease: 'Diminuer la quantité',
    qtyIncrease: 'Augmenter la quantité',
    removeItem: 'Retirer',
    totalLabel: 'Total',
    clearCart: 'Vider le panier',
    checkoutBtn: 'Paiement',
    restaurantsTitle: 'Explorer',
    restaurantsSubtitle: 'Trouvez des restaurants et des plats signatures.',
    searchRestaurantsPlaceholder: 'Rechercher par nom ou ville…',
    restaurantsLoadFailed: 'Impossible de charger les restaurants',
    noRestaurantsFound: 'Aucun restaurant trouvé.',
    restaurantLoadFailed: 'Impossible de charger le restaurant',
    restaurantNotFound: 'Restaurant introuvable.',
    restaurantDefaultBlurb: 'Saveurs authentiques, expérience premium.',
    cartSwitchWarning: 'Changer de restaurant vide le panier',
    cartSwitchConfirmTitle: 'Commencer une nouvelle commande ?',
    cartSwitchConfirmBody: 'Votre panier actuel sera vidé. Voulez-vous continuer ?',
    cartSwitchConfirmOk: 'Oui, vider le panier',
    cartSwitchConfirmCancel: 'Annuler',
    goToCart: 'Voir le panier',
    menuNotAvailable: 'Menu pas encore disponible.',
    addToCart: 'Ajouter au panier',
    menuItemFallbackDesc: 'Un grand classique, préparé avec soin.',
    profileTitle: 'Profil',
    profileSubtitle: 'Gérez votre compte et suivez vos commandes.',
    profileSignedInAs: 'Connecté en tant que',
    profileViewOrders: 'Voir les commandes',
    authAsideTitle: 'Découvrez l’Afrique en version premium',
    authAsideSubtitle:
      'Restaurants sélectionnés, paiement fluide et suivi en temps réel jusqu’à chez vous.',
    authConfirmInvalidTitle: 'Lien invalide ou expiré',
    authConfirmInvalidBody:
      'Votre lien de confirmation a expiré ou a déjà été utilisé. Vous pouvez en demander un nouveau depuis la page de connexion.',
    authGoLogin: 'Aller à la connexion',
    authBackHome: 'Retour à l’accueil',
    authConfirming: 'Confirmation…',
    authFinishingSignIn: 'Finalisation de la connexion',
    resetTitle: 'Réinitialiser le mot de passe',
    resetSubtitle: 'Choisissez un nouveau mot de passe pour votre compte.',
    resetNewPassword: 'Nouveau mot de passe',
    resetUpdate: 'Mettre à jour le mot de passe',
    resetSaving: 'Enregistrement…',
    resetFailed: 'Échec de la réinitialisation',
    checkoutCartEmpty: 'Votre panier est vide.',
    checkoutLoginPrompt: 'Connectez-vous pour passer commande.',
    checkoutPaymentLoadHint: 'Appuyez sur « Créer la commande » pour afficher le paiement sécurisé.',
    checkoutOrderCreateFailed: 'Échec de la création de la commande',
    checkoutPaymentFailed: 'Paiement échoué',
    checkoutGuestTitle: 'Paiement',
    ordersRestaurantFallback: 'Restaurant',
    ordersMoreItems: '+{count} de plus',
    errorBoundaryTitle: 'Une erreur s’est produite',
    errorBoundaryHint:
      'Actualisez la page. Si le problème persiste, contactez le support.',
    errorBoundaryRefresh: 'Actualiser',
    openDishAria: 'Ouvrir {name}',
    popularCarouselPrev: 'Plat précédent',
    popularCarouselNext: 'Plat suivant',
    popularCarouselDotAria: 'Aller au plat {n}',
    reviewCta: 'Laisser un avis',
    reviewTitle: 'Noter votre commande',
    reviewSubtitle: 'Votre retour nous aide à nous améliorer et met en avant les meilleurs restaurants.',
    reviewPlaceholder: 'Dites-nous ce que vous avez aimé (optionnel)…',
    reviewSubmit: 'Envoyer',
    reviewSubmitting: 'Envoi…',
    reviewThanks: 'Merci pour votre avis !',
    reviewFailed: 'Échec de l’envoi de l’avis',
  },
  pt: {
    heroBadge: 'Entrega premium',
    heroTitle1: 'Cozinha africana autêntica, elevada',
    heroTitle2: 'Restaurantes selecionados na sua cidade',
    heroTitle3: 'Pedido fluido, pagamento seguro',
    heroSubtitle1: 'Entrega de luxo para quem ama boa comida',
    heroSubtitle2: 'Cozinhas selecionadas e serviço premium',
    heroSubtitle3: 'Da descoberta à entrega em minutos',
    searchPlaceholder: 'Pesquisar restaurantes ou pratos…',
    ctaExplore: 'Explorar restaurantes',
    ctaTrack: 'Rastrear pedido',
    sectionFeatured: 'Destaques perto de você',
    sectionPopular: 'Mais populares agora',
    sectionHow: 'Como funciona',
    sectionTestimonials: 'Amado pelos clientes',
    loginTitle: 'Bem-vindo de volta',
    loginSubtitle: 'Entre para continuar sua experiência premium.',
    loginEmail: 'E-mail',
    loginPassword: 'Senha',
    loginContinue: 'Continuar',
    loginSigningIn: 'A entrar…',
    loginForgot: 'Esqueci a senha',
    loginNoAccount: 'Sem conta?',
    loginCreateOne: 'Criar conta',
    loginPasswordResetSent: 'E-mail de redefinição enviado. Verifique a sua caixa de entrada.',
    loginFailed: 'Falha no início de sessão',
    registerTitle: 'Criar conta',
    registerSubtitle:
      'Junte-se à Kolia e descubra cozinha africana premium perto de si.',
    registerFullName: 'Nome completo (opcional)',
    registerEmail: 'E-mail',
    registerPassword: 'Senha',
    registerCreate: 'Criar',
    registerCreating: 'A criar…',
    registerResend: 'Reenviar e-mail de confirmação',
    registerHaveAccount: 'Já tem conta?',
    registerLogin: 'Entrar',
    registerCheckInbox:
      'Confirme o e-mail na sua caixa de entrada e volte para entrar.',
    registerConfirmResent: 'E-mail de confirmação reenviado.',
    registerFailed: 'Falha ao registar',
    forgotPasswordFailed: 'Falha ao enviar e-mail de redefinição',
    checkoutTitle: 'Checkout',
    checkoutSubtitle: 'Confirme os detalhes e pague com segurança.',
    checkoutOrderType: 'Tipo de pedido',
    checkoutDelivery: 'Entrega',
    checkoutPickup: 'Levantar',
    checkoutNotes: 'Notas (opcional)',
    checkoutNotesPlaceholder: 'Alergias, instruções de entrega…',
    checkoutCreateOrder: 'Criar pedido',
    checkoutCreatingOrder: 'A criar pedido…',
    checkoutPaymentReady: 'Pagamento pronto',
    checkoutPaymentTitle: 'Pagamento',
    checkoutPaySecurely: 'Pagar com segurança',
    checkoutProcessing: 'A processar…',
    checkoutSubtotal: 'Subtotal',
    checkoutDeliveryFee: 'Taxa de entrega',
    checkoutTotal: 'Total',
    ordersTitle: 'Pedidos',
    ordersEmpty: 'Ainda sem pedidos.',
    ordersLoadFailed: 'Falha ao carregar pedidos',
    navHome: 'Início',
    navExplore: 'Explorar',
    navCart: 'Cesto',
    navProfile: 'Perfil',
    navLogout: 'Sair',
    navLogin: 'Entrar',
    brandCustomer: 'Cliente',
    langLabel: 'Idioma',
    langEn: 'English',
    langFr: 'Français',
    langPt: 'Português',
    sectionFeaturedSubtitle: 'Restaurantes e pratos de assinatura escolhidos a dedo.',
    viewAll: 'Ver tudo',
    liveStatusTitle: 'Estado em direto',
    liveStatusSubtitle: 'O seu pedido atual de relance.',
    sectionPopularSubtitle: 'Escolhas premium com checkout rápido.',
    browse: 'Navegar',
    howSubtitle: 'Um fluxo premium da descoberta à entrega.',
    stepPrefix: 'PASSO',
    howStep1Title: 'Descobrir',
    howStep1Desc: 'Navegue por restaurantes e pratos selecionados.',
    howStep2Title: 'Pagamento',
    howStep2Desc: 'Pague com segurança num fluxo moderno e simples.',
    howStep3Title: 'Desfrutar',
    howStep3Desc: 'Acompanhe o estado e receba o seu pedido.',
    ctaReadyTitle: 'Pronto para encomendar?',
    ctaReadySubtitle:
      'Descubra cozinha africana premium e receba rápido em casa.',
    startOrdering: 'Começar',
    heroSlideAria: 'Slide do hero {n}',
    cuisineAll: 'Todos',
    cuisineWestAfrican: 'África Ocidental',
    cuisineCongolese: 'Congolesa',
    cuisineNorthAfrican: 'Norte de África',
    cuisineCentralAfrican: 'África Central',
    cuisineSouthernAfrican: 'África Austral',
    cuisineLusophone: 'Lusófona',
    cuisinePanAfrican: 'Pan-africana',
    tagPopular: 'Popular',
    tagChefPick: 'Escolha do chef',
    tagTrending: 'Em alta',
    testimonial1Text:
      'Finalmente comida da África Ocidental autêntica, entregue com cuidado e no tempo.',
    testimonial2Text: 'A app parece premium e os pratos são sempre excelentes.',
    testimonial3Text: 'Checkout rápido, acompanhamento claro e sabores incríveis sempre.',
    activeOrderLabel: 'Pedido ativo',
    orderStatusOnTheWay: 'A caminho',
    orderRestaurantLabel: 'Restaurante',
    orderEtaLabel: 'Previsão',
    activeTrackOrder: 'Acompanhar',
    activeReorderBtn: 'Pedir de novo',
    reorderSectionLabel: 'Pedir de novo',
    reorderFavoritesTitle: 'Os seus favoritos',
    reorderFavoritesSubtitle: 'Peça de novo com um toque dos restaurantes recentes.',
    addToFavorites: 'Guardar nos favoritos',
    removeFromFavorites: 'Remover dos favoritos',
    discountBadge: '-10%',
    browseRestaurantsBtn: 'Explorar restaurantes',
    openCartBtn: 'Abrir cesto',
    cartTitle: 'Cesto',
    cartSubtitle: 'Reveja os artigos antes do pagamento.',
    cartEmpty: 'O seu cesto está vazio.',
    qtyDecrease: 'Diminuir quantidade',
    qtyIncrease: 'Aumentar quantidade',
    removeItem: 'Remover',
    totalLabel: 'Total',
    clearCart: 'Esvaziar cesto',
    checkoutBtn: 'Checkout',
    restaurantsTitle: 'Explorar',
    restaurantsSubtitle: 'Encontre restaurantes e pratos de assinatura.',
    searchRestaurantsPlaceholder: 'Pesquisar por nome ou cidade…',
    restaurantsLoadFailed: 'Falha ao carregar restaurantes',
    noRestaurantsFound: 'Nenhum restaurante encontrado.',
    restaurantLoadFailed: 'Falha ao carregar restaurante',
    restaurantNotFound: 'Restaurante não encontrado.',
    restaurantDefaultBlurb: 'Sabores autênticos, experiência premium.',
    cartSwitchWarning: 'Mudar de restaurante esvazia o cesto',
    cartSwitchConfirmTitle: 'Começar uma nova encomenda?',
    cartSwitchConfirmBody: 'O seu cesto atual será esvaziado. Deseja continuar?',
    cartSwitchConfirmOk: 'Sim, esvaziar o cesto',
    cartSwitchConfirmCancel: 'Cancelar',
    goToCart: 'Ir ao cesto',
    menuNotAvailable: 'Menu ainda não disponível.',
    addToCart: 'Adicionar ao cesto',
    menuItemFallbackDesc: 'Um clássico premium, feito com cuidado.',
    profileTitle: 'Perfil',
    profileSubtitle: 'Gerir a sua conta e acompanhar pedidos.',
    profileSignedInAs: 'Sessão iniciada como',
    profileViewOrders: 'Ver pedidos',
    authAsideTitle: 'Prove África ao estilo premium',
    authAsideSubtitle:
      'Restaurantes selecionados, checkout suave e rastreio até à sua porta.',
    authConfirmInvalidTitle: 'Ligação inválida ou expirada',
    authConfirmInvalidBody:
      'A sua ligação de confirmação expirou ou já foi usada. Pode pedir um novo e-mail na página de entrada.',
    authGoLogin: 'Ir para entrar',
    authBackHome: 'Voltar ao início',
    authConfirming: 'A confirmar…',
    authFinishingSignIn: 'A concluir o início de sessão',
    resetTitle: 'Repor palavra-passe',
    resetSubtitle: 'Escolha uma nova palavra-passe para a sua conta.',
    resetNewPassword: 'Nova palavra-passe',
    resetUpdate: 'Atualizar palavra-passe',
    resetSaving: 'A guardar…',
    resetFailed: 'Falha ao repor palavra-passe',
    checkoutCartEmpty: 'O seu cesto está vazio.',
    checkoutLoginPrompt: 'Inicie sessão para encomendar.',
    checkoutPaymentLoadHint: 'Toque em «Criar pedido» para carregar o pagamento seguro.',
    checkoutOrderCreateFailed: 'Falha ao criar pedido',
    checkoutPaymentFailed: 'Pagamento falhou',
    checkoutGuestTitle: 'Checkout',
    ordersRestaurantFallback: 'Restaurante',
    ordersMoreItems: '+{count} mais',
    errorBoundaryTitle: 'Algo correu mal',
    errorBoundaryHint:
      'Atualize a página. Se continuar, contacte o suporte.',
    errorBoundaryRefresh: 'Atualizar',
    openDishAria: 'Abrir {name}',
    popularCarouselPrev: 'Prato anterior',
    popularCarouselNext: 'Prato seguinte',
    popularCarouselDotAria: 'Ir para o prato {n}',
    reviewCta: 'Deixar avaliação',
    reviewTitle: 'Avaliar o seu pedido',
    reviewSubtitle: 'O seu feedback ajuda-nos a melhorar e a destacar os melhores restaurantes.',
    reviewPlaceholder: 'Conte-nos o que gostou (opcional)…',
    reviewSubmit: 'Enviar',
    reviewSubmitting: 'A enviar…',
    reviewThanks: 'Obrigado pela sua avaliação!',
    reviewFailed: 'Falha ao enviar a avaliação',
  },
};

export function getCopyForLocale(locale: Locale): Copy {
  return COPY[locale];
}

/** For class components or non-React code; respects env lock, localStorage, then browser. */
export function getCopySync(): Copy {
  return getCopyForLocale(getInitialLocale());
}

/** @deprecated Prefer useCopy() inside React components */
export function getCopy(): Copy {
  return getCopySync();
}
