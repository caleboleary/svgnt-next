type Star = {
  x: number;
  y: number;
  radius: number;
  name: string;
  active: boolean;
  assets: number;
  iron: number;
  uranium: number;
  ice: number;
  gold: number;
  UUU: number;
  antimatter: number;
  mined: boolean;
  visited: boolean;
  firstVisitedBy: boolean;
  index: number;
  type: string;
  glowColor: string; // can I type hsla colors
  visible: boolean;
  moving: boolean;
  id: number;
  ironInit: number;
  uraniumInit: number;
  iceInit: number;
  goldInit: number;
  UUUInit: number;
  antimatterInit: number;
};

export default Star;
