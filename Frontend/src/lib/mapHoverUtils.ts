import maplibregl from "maplibre-gl";

export interface HoverEventHandler {
  onMouseEnter: (e: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => void;
  onMouseLeave: () => void;
  onMouseMove: (e: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => void;
}

export function createHoverHandlers(
  mapRef: React.RefObject<maplibregl.Map>,
  layerId: string,
  layerType: 'state' | 'district',
  setHoverInfo: (info: {
    visible: boolean;
    x: number;
    y: number;
    data: any;
    type: 'state' | 'district' | null;
  }) => void
): HoverEventHandler {
  
  const onMouseEnter = (e: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
    if (!mapRef.current || !e.features || e.features.length === 0) return;
    
    // Change cursor to pointer
    mapRef.current.getCanvasContainer().style.cursor = 'pointer';
    
    // Get feature properties
    const feature = e.features[0];
    const properties = feature.properties;
    
    // Show hover info card
    setHoverInfo({
      visible: true,
      x: 0, // No longer needed for positioning
      y: 0, // No longer needed for positioning
      data: properties,
      type: layerType,
    });
  };

  const onMouseLeave = () => {
    if (!mapRef.current) return;
    
    // Reset cursor
    mapRef.current.getCanvasContainer().style.cursor = '';
    
    // Hide hover popup
    setHoverInfo({
      visible: false,
      x: 0,
      y: 0,
      data: null,
      type: null,
    });
  };

  const onMouseMove = (e: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
    if (!e.features || e.features.length === 0) return;
    
    // Update info card with new feature data when moving between features
    const feature = e.features[0];
    const properties = feature.properties;
    
    setHoverInfo({
      visible: true,
      x: 0,
      y: 0,
      data: properties,
      type: layerType,
    });
  };

  return {
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  };
}

export function attachHoverListeners(
  mapRef: React.RefObject<maplibregl.Map>,
  layerId: string,
  layerType: 'state' | 'district',
  setHoverInfo: (info: {
    visible: boolean;
    x: number;
    y: number;
    data: any;
    type: 'state' | 'district' | null;
  }) => void
) {
  if (!mapRef.current) return;
  
  const handlers = createHoverHandlers(mapRef, layerId, layerType, setHoverInfo);
  
  // Attach event listeners
  mapRef.current.on('mouseenter', layerId, handlers.onMouseEnter);
  mapRef.current.on('mouseleave', layerId, handlers.onMouseLeave);
  mapRef.current.on('mousemove', layerId, handlers.onMouseMove);
}

export function detachHoverListeners(
  mapRef: React.RefObject<maplibregl.Map>,
  layerId: string,
  setHoverInfo: (info: {
    visible: boolean;
    x: number;
    y: number;
    data: any;
    type: 'state' | 'district' | null;
  }) => void
) {
  if (!mapRef.current) return;
  
  // Hide any visible popup when detaching
  setHoverInfo({
    visible: false,
    x: 0,
    y: 0,
    data: null,
    type: null,
  });
  
  // Note: MapLibre automatically removes event listeners when layers are removed
  // So we just need to clean up the popup state
}