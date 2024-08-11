"use client";
import React from "react";
import { RecoilRoot, atom } from "recoil";

const RecoilContextProvider = ({ children }: any) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export const budgetIdState = atom({
  key: "budgetId",
  default: "" as string,
});

export const loaderInputState = atom<boolean>({
  key: "loaderInput",
  default: false,
});

export default RecoilContextProvider;
