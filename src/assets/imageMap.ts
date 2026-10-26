import heroMathWorkshop from './images/hero_math_workshop_1792921517918.jpg';
import missionBotanicalGarden from './images/mission_botanical_garden_1792921518926.jpg';
import missionScienceExpedition from './images/mission_science_expedition_1792921519621.jpg';
import missionUrbanArchitecture from './images/mission_urban_architecture_1792921520109.jpg';

export const APP_IMAGES = {
  heroWorkshop: heroMathWorkshop,
  missionGarden: missionBotanicalGarden,
  missionScience: missionScienceExpedition,
  missionArchitecture: missionUrbanArchitecture,
} as const;

export type AppImageKey = keyof typeof APP_IMAGES;
