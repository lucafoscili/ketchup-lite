import { kulManagerSingleton } from "src";
import {
  KulMessengerAvatarNode,
  KulMessengerDataset,
  KulMessengerLocationNode,
  KulMessengerOutfitNode,
  KulMessengerStyleNode,
} from "../../../kul-messenger/kul-messenger-declarations";

export const FREYA_BIO = `
# Freya - Norse Goddess of Love, Beauty, and War

Freya is one of the most prominent goddesses in Norse mythology, associated with love, beauty, fertility, war, death, prosperity, and magic. She is considered one of the most important deities in the Norse pantheon.

### Origins and Family

- Freya is believed to be the daughter of Njord, the god of the sea and fertility [2].
- She is often depicted as the sister and wife of Freyr, another major Norse deity [2].

### Powers and Attributes

- Freya is associated with love, beauty, and fertility, often referred to as the "Lady of Love" [2].
- She is said to possess magical powers, particularly related to love and war [2].
- Her sacred animal is the cat, symbolizing her association with femininity and fertility [2].

### Magical Objects

- Freya owns the famous necklace Brisingamen, said to grant its wearer irresistible charm and power [2].
- She is also associated with the Valkyries, female figures who choose which warriors die in battle [2].

### Role in Mythology

- Freya plays a significant role in many Norse myths, often serving as a mediator between gods and humans [2].
- In some stories, she is portrayed as a fierce warrior, participating in battles alongside the gods [2].

### Cultural Significance

- Freya remains an important figure in modern Norse culture and paganism [2].
- Her name has been adopted into English as a given name, meaning "beloved" or "desired" [2].

### Summary

Freya embodies the complex nature of feminine power in Norse mythology, combining attributes of love, war, and fertility. Her enduring presence in Norse literature and cultural heritage testifies to her significance as a multifaceted goddess.
`;

export const FREYA_AVATARS: () => KulMessengerAvatarNode[] = () => [
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get("./assets/media/avatar_freya.png")
          .path,
      },
    },
    description: "Freya dressed for war",
    id: "avatar_0",
    value: "Freya",
  },
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get(
          "./assets/media/avatar_freya_2.png",
        ).path,
      },
    },
    description: "Freya during a ceremony",
    id: "avatar_1",
    value: "Freya",
  },
];

export const FREYA_LOCATIONS: () => KulMessengerLocationNode[] = () => [
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get(
          "./assets/media/location_lake.png",
        ).path,
      },
    },
    description: "Lake at night, the sky feats a beautiful aurora borealis.",
    id: "location_0",
    value: "Northern lake",
  },
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get(
          "./assets/media/location_armory.png",
        ).path,
      },
    },
    description: "Armory of Asgard.",
    id: "location_1",
    value: "Asgard's armory",
  },
];

export const FREYA_OUTFITS: () => KulMessengerOutfitNode[] = () => [
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get(
          "./assets/media/outfit_armor_2.png",
        ).path,
      },
    },
    description: "Regal armor made of gold and engraved.",
    id: "outfit_0",
    value: "Golden armor",
  },
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get("./assets/media/outfit_dress.png")
          .path,
      },
    },
    description: "Elegant summer dress fit for a goddess",
    id: "outfit_1",
    value: "Elegant summer dress",
  },
];

export const FREYA_STYLES: () => KulMessengerStyleNode[] = () => [
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get(
          "./assets/media/style_photorealistic.png",
        ).path,
      },
    },
    description: "Photorealistic image.",
    id: "style_0",
    value: "Photorealistic",
  },
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get("./assets/media/style_anime.png")
          .path,
      },
    },
    description: "Anime styled image.",
    id: "style_1",
    value: "Anime",
  },
];

export const THOR_BIO = `
# Thor: The Mighty God of Thunder

Thor is one of the most iconic figures in Norse mythology, known as the god of thunder and lightning. He is a powerful deity revered for his strength, courage, and protection of humanity.

### Origins and Name

- Thor's name is derived from Old Norse Þórr, which stems from the Proto-Germanic theonym *Þun(a)raz, meaning "Thunder" [2].
- His name evolved over time, appearing in various forms across Germanic languages, including Thunor in Old English and Donar in Old High German [2].

### Attributes and Associations

- God of thunder, lightning, storms, sacred groves and trees, strength, protection of mankind, hallowing, and fertility [2]
- Wields the mighty hammer Mjölnir, wears the belt Megingjörð and iron gloves Járngreipr [2]
- Owns the staff Gríðarvölr and rides in a chariot pulled by two magical goats, Tanngrisnir and Tanngnjóstr [2]

### Family and Relationships

- Son of Odin and Jörð (Earth) [2]
- Husband of the golden-haired goddess Sif and lover of the jötunn Járnsaxa [2]
- Father of Magni, Móði, and Þrúðr [2]
- Stepfather of Ullr [2]

### Notable Exploits

- Battles the monstrous serpent Jörmungandr, destined to kill each other during Ragnarök [2]
- Known for his relentless slaughter of enemies and fierce battles [2]
- Has numerous brothers, including Baldr [2]

### Cultural Impact

- Thursday is named after Thor (Old English thunresdæg, "Thunor's day") [2]
- Thor continues to influence folklore and popular culture in Germanic-speaking Europe [2]
- Modern Heathenry revives veneration of Thor [2]

### Legacy

As one of the most prominent gods in Norse mythology, Thor remains a significant cultural figure, inspiring artistic works and appearing in modern popular culture. His association with thunder and strength has made him a lasting symbol in Germanic cultures.
`;

export const THOR_AVATARS: () => KulMessengerAvatarNode[] = () => [
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get("./assets/media/avatar_thor.png")
          .path,
      },
    },
    description: "Thor with Mjollnir",
    id: "avatar_0",
    value: "Thor",
  },
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get(
          "./assets/media/avatar_thor_2.png",
        ).path,
      },
    },
    description: "Thor in the land of fire",
    id: "avatar_1",
    value: "Thor",
  },
];

export const THOR_LOCATIONS: () => KulMessengerLocationNode[] = () => [
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get(
          "./assets/media/location_asgard_halls.png",
        ).path,
      },
    },
    description: "The halls of the Palace of Asgard",
    id: "location_0",
    value: "Asgard's Palace",
  },
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get(
          "./assets/media/location_bifrost_bridge.png",
        ).path,
      },
    },
    description: "The portal to other realms.",
    id: "location_1",
    value: "Bifrost Bridge",
  },
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get(
          "./assets/media/location_forest.png",
        ).path,
      },
    },
    description: "A misteryous forest on Earth.",
    id: "location_2",
    value: "Forest",
  },
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get(
          "./assets/media/location_armory.png",
        ).path,
      },
    },
    description: "Armory of Asgard.",
    id: "location_3",
    value: "Asgard's armory",
  },
];

export const THOR_OUTFITS: () => KulMessengerOutfitNode[] = () => [
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get("./assets/media/outfit_armor.png")
          .path,
      },
    },
    description: "Regal armor made of gold and engraved.",
    id: "outfit_0",
    value: "Golden armor",
  },
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get(
          "./assets/media/outfit_armor_3.png",
        ).path,
      },
    },
    description: "Armor made of steel.",
    id: "outfit_1",
    value: "Steel armor",
  },
];

export const THOR_STYLES: () => KulMessengerStyleNode[] = () => [
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get("./assets/media/style_comic.png")
          .path,
      },
    },
    description: "Comic image.",
    id: "style_0",
    value: "Comic",
  },
  {
    cells: {
      kulImage: {
        shape: "image",
        value: kulManagerSingleton.assets.get(
          "./assets/media/style_painting.png",
        ).path,
      },
    },
    description: "Painting styled image.",
    id: "style_1",
    value: "Painting",
  },
];

export const MESSENGER_KULDATA: () => KulMessengerDataset = () => ({
  nodes: [
    {
      children: [
        {
          children: THOR_AVATARS(),
          id: "avatars",
          value: 0,
        },
        { id: "biography", value: THOR_BIO },
        { id: "chat", value: "" },
        {
          children: THOR_LOCATIONS(),
          id: "locations",
          value: 0,
        },
        {
          children: THOR_OUTFITS(),
          id: "outfits",
          value: 0,
        },
        {
          children: THOR_STYLES(),
          id: "styles",
          value: 0,
        },
        {
          children: [],
          id: "timeframes",
          value: null,
        },
      ],
      id: "character_Thor",
      value: "Thor",
    },
    {
      children: [
        {
          children: FREYA_AVATARS(),
          id: "avatars",
          value: 1,
        },
        { id: "biography", value: FREYA_BIO },
        { id: "chat", value: "" },
        {
          children: FREYA_LOCATIONS(),
          id: "locations",
          value: 0,
        },
        {
          children: FREYA_OUTFITS(),
          id: "outfits",
          value: 0,
        },
        {
          children: FREYA_STYLES(),
          id: "styles",
          value: 0,
        },
        {
          children: [],
          id: "timeframes",
          value: null,
        },
      ],
      id: "character_Freya",
      value: "Freya",
    },
  ],
});
