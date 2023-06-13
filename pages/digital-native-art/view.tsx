import React, { useState, useRef, useEffect } from 'react';
import * as fcl from "@onflow/fcl";

const network = 'mainnet';

const random = () => {
  return Math.random().toString(36).slice(2);
}

export default function DigitalNativeArtView() {
  const deployedTime = 1681213761233;
  const [time, setTime] = useState(0);
  const [creations, setCreations] = useState("-");
  const [destructions, setDestructions] = useState("-");

  const [creationsKey, setCreationsKey] = useState(random());
  const [destructionsKey, setDestructionsKey] = useState(random());

  const intervalRef = useRef(null);
  const intervalFetchRef = useRef(null);
  const backgroundRef = useRef(null);

  const days = Math.floor(time / (24 * 60 * 60 * 1000));
  const daysms = time % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const minutes = `00${Math.floor(time / 60000) % 60}`.slice(-2);
  const seconds = `00${Math.floor(time / 1000) % 60}`.slice(-2);
  const milliseconds = `000${time % 1000}`.slice(-3).slice(0, 1);

  const fetchArtInfo = async () => {
    try {
      fcl.config({
        "accessNode.api": network === "mainnet" ? "https://rest-mainnet.onflow.org" : "https://rest-testnet.onflow.org",
        "fcl.network": network || "testnet",
      });
      const info = await fcl.query({
        cadence: `\
  import Atelier from 0x8c1f11aac68c6777

  pub struct Info {
      pub let creations: UInt64
      pub let destructions: UInt64

      init(creations: UInt64, destructions: UInt64) {
          self.creations = creations
          self.destructions = destructions
      }
  }

  pub fun main(): Info {
      return Info(
          creations: Atelier.creations,
          destructions: Atelier.destructions
      )
  }`,
        args: () => [],
      });
      console.log(info);
      setCreations(info.creations);
      setDestructions(info.destructions);
      setCreationsKey(random());
      setDestructionsKey(random());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (intervalRef && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - deployedTime);
      }, 10);
    }
    if (intervalFetchRef && !intervalFetchRef.current) {
      fetchArtInfo();
      intervalFetchRef.current = setInterval(() => {
        fetchArtInfo();
      }, 10000);
    }
    if (backgroundRef && backgroundRef.current) {
      const numStars = 200;
      const container = document.getElementById('stars');
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 10 + 5}s`;
        container.appendChild(star);
      }
    }
  }, []);

  return (
    <div className="digitaiNativeArt">
      <div id="stars" ref={backgroundRef}></div>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1>
            Age
          </h1>
          <h1 className="mt-8 neon">
            {days}d {hours}h {minutes}m {seconds}.{milliseconds}s
          </h1>

          <h1 className="mt-32">
            Creations
          </h1>
          <h1 className="mt-8 neon" key={creationsKey}>
            {creations}
          </h1>

          <h1 className="mt-32">
            Destructions
          </h1>
          <h1 className="mt-8 neon" key={destructionsKey}>
            {destructions}
          </h1>
        </div>
      </div>
    </div>
  );
}
