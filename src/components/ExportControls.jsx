import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { saveAs } from 'file-saver';

const useExportControls = (canvasRef) => {
  const handleExport = () => {
    const exporter = new GLTFExporter();
    const options = {
      binary: true,
      trs: false,
      onlyVisible: true,
      truncateDrawRange: true,
      embedImages: true,
    };

    try {
      exporter.parse(
        canvasRef.current.scene,
        (result) => {
          const output = options.binary ? result : JSON.stringify(result, null, 2);
          const blob = new Blob([output], { type: options.binary ? 'application/octet-stream' : 'application/json' });
          saveAs(blob, 'scene.glb');
        },
        (error) => {
          console.error('An error occurred during parsing', error);
        },
        options
      );
    } catch (error) {
      console.error('An unexpected error occurred during export:', error);
    }
  };

  return { handleExport };
};

export default useExportControls;
