import React, { useEffect, useState, useMemo } from 'react';
import { Box, useMantineColorScheme, useMantineTheme } from '@mantine/core';

interface SvgBackgroundProps {
  src: string;
  opacity?: number;
  position?: 'absolute' | 'relative' | 'fixed';
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  zIndex?: number;
  filter?: string;
  className?: string;
}

/**
 * A robust component that renders an SVG as a background with color scheme handling
 */
export function SvgBackground({
  src,
  opacity = 0.5,
  position = 'absolute',
  top = 0,
  left = 0,
  right = 0,
  bottom = 0,
  zIndex = -1,
  filter,
  className,
}: SvgBackgroundProps) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === 'dark';

  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Determine the correct SVG path based on color scheme
  const svgPath = useMemo(() => {
    // Check if the path already includes /light/ or /dark/
    if (src.includes('/light/') || src.includes('/dark/')) {
      return src;
    }

    // Handle paths for landing SVGs
    if (src.includes('/svg/landing/')) {
      const themeFolder = isDark ? 'dark' : 'light';
      
      // Extract the filename from the path
      const parts = src.split('/');
      const filename = parts[parts.length - 1];
      
      // Construct the path with the appropriate theme folder
      const basePath = src.substring(0, src.lastIndexOf('/'));
      return `${basePath}/${themeFolder}/${filename}`;
    }

    return src;
  }, [src, isDark]);

  useEffect(() => {
    // Reset state when src changes
    setSvgContent(null);
    setError(null);

    // Fetch the SVG content
    const fetchSvg = async () => {
      try {
        const response = await fetch(svgPath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setSvgContent(text);
      } catch (err) {
        console.error('Error loading SVG from path:', svgPath, err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      }
    };

    fetchSvg();
  }, [svgPath]);

  // Memoize the processed SVG content to avoid unnecessary re-processing
  const processedSvgContent = useMemo(() => {
    if (!svgContent) return null;

    // Color for dark/light mode
    const accentColor = isDark ? theme.colors.violet[6] : theme.colors.violet[2];

    try {
      // Create a temporary div to parse the SVG
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
      const svgElement = svgDoc.documentElement;

      // Set width and height to 100%
      svgElement.setAttribute('width', '100%');
      svgElement.setAttribute('height', '100%');
      svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      
      // Set color scheme specific styles
      svgElement.style.color = accentColor;

      // Modify fill and stroke attributes
      const elements = svgElement.querySelectorAll('*');
      elements.forEach(el => {
        if (el instanceof SVGElement) {
          // Replace fill="none" with a color
          if (el.getAttribute('fill') === 'none') {
            el.setAttribute('fill', 'currentColor');
            el.setAttribute('fill-opacity', opacity.toString());
          }

          // Ensure strokes use currentColor
          if (el.getAttribute('stroke')) {
            el.setAttribute('stroke', 'currentColor');
          }
        }
      });

      // Serialize back to string
      return new XMLSerializer().serializeToString(svgElement);
    } catch (err) {
      console.error('Error processing SVG:', err);
      return null;
    }
  }, [svgContent, isDark, theme, opacity]);

  // Render error state if SVG fails to load
  if (error) {
    return (
      <Box
        component="div"
        pos={position}
        top={top}
        left={left}
        right={right}
        bottom={bottom}
        className={className}
        style={{
          zIndex,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'red',
        }}
      >
        Error loading SVG: {error.message}
      </Box>
    );
  }

  // No content yet
  if (!processedSvgContent) return "nothign";

  return (
    <Box
      component="div"
      pos={position}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      className={className}
      style={{
        zIndex,
        opacity,
        filter,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
      dangerouslySetInnerHTML={{ __html: processedSvgContent }}
    />
  );
}

export default SvgBackground;