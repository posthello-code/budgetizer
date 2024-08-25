"use client";
import React from "react";
import { RecoilRoot, atom } from "recoil";

const RecoilContextProvider = ({ children }: any) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export const budgetId = atom({
  key: "budgetId",
  default: "",
});

export const symKey = atom({
  key: "symKey",
  default: "",
});

export default RecoilContextProvider;
