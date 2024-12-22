import React from "react";

export type SidebarType = {
  path?: string;
  name: string;
  icon: React.ReactElement;
};

export type DashboardOBJType = {
  color: string;
  icon: React.ReactNode;
  name: string;
  value1: string;
  value2: string;
  value3: string;
  chart: React.ReactElement;
};

export type AdminProductType = {
  name: string;
  img: string;
  qty: number;
  dmg: number;
  sold: number;
};
