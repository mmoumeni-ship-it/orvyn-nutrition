import bowl1 from "@/assets/orvyn-bowl-1.jpg";
import bowl2 from "@/assets/orvyn-bowl-2.jpg";
import bowl3 from "@/assets/orvyn-bowl-3.jpg";
import bowlChicken from "@/assets/orvyn-bowl-chicken.jpg";
import bowlBeef from "@/assets/orvyn-bowl-beef.jpg";
import bowlSalmon from "@/assets/orvyn-bowl-salmon.jpg";
import bowlVeggie from "@/assets/orvyn-bowl-veggie.jpg";
import bowlThai from "@/assets/orvyn-bowl-thai.jpg";
import shakeVanille from "@/assets/orvyn-shake-vanille.jpg";
import shakeChoco from "@/assets/orvyn-shake-choco.jpg";
import shakeMatcha from "@/assets/orvyn-shake-matcha.jpg";
import shakeCafe from "@/assets/orvyn-shake-cafe.jpg";
import snacks from "@/assets/orvyn-snacks.jpg";
import snackEnergyBalls from "@/assets/orvyn-snack-energy-balls.jpg";
import snackBrownie from "@/assets/orvyn-snack-brownie.jpg";
import snackFruitsRouges from "@/assets/orvyn-snack-fruits-rouges.jpg";
import snackYaourtGrec from "@/assets/orvyn-snack-yaourt-grec.jpg";
import snackCookie from "@/assets/orvyn-snack-cookie.jpg";
import snackBananaBread from "@/assets/orvyn-snack-banana-bread.jpg";
import hero from "@/assets/orvyn-hero.jpg";
import prep from "@/assets/orvyn-prep.mp4.asset.json";

export const MEDIA = {
  bowl1: bowlChicken,
  bowl2: bowlSalmon,
  bowl3: bowlBeef,
  shake1: shakeVanille,
  shake2: shakeMatcha,
  snacks,
  hero,
  prepVideo: prep.url,
};

export const MEAL_IMAGE: Record<string, string> = {
  "power-chicken": bowlChicken,
  "beef-performance": bowlBeef,
  "salmon-recovery": bowlSalmon,
  "veggie-protein": bowlVeggie,
  "weekly-thai-chicken": bowlThai,
};

export const SHAKE_IMAGE: Record<string, string> = {
  "whey-vanille": shakeVanille,
  "whey-choco": shakeChoco,
  "matcha-signature": shakeMatcha,
  "cafe-boost": shakeCafe,
};

export const SNACK_IMAGE: Record<string, string> = {
  "energy-balls": snackEnergyBalls,
  "brownie-prot": snackBrownie,
  "fruits-rouges": snackFruitsRouges,
  "yaourt-grec": snackYaourtGrec,
  "cookie-prot": snackCookie,
  "banana-bread": snackBananaBread,
};

export function imageForId(id: string, fallback = bowlChicken): string {
  return MEAL_IMAGE[id] ?? SHAKE_IMAGE[id] ?? SNACK_IMAGE[id] ?? fallback;
}
