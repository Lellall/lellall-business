import React, { useCallback } from 'react';
import Particles from 'react-particles';
import { loadLinksPreset } from '@tsparticles/preset-links';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadLinksPreset(engine); // Load the links preset
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: 'links', // Use the links preset
        background: {
          color: '#0a0a0a', // Match Banner's background
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: '#ffffff', // White particles
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            onClick: {
              enable: true,
              mode: 'push',
            },
          },
          modes: {
            repulse: {
              distance: 100,
            },
            push: {
              quantity: 4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;