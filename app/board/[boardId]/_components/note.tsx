import { cn, colorToCSS, getContrastingTextColor } from "@/lib/utils";
import { NoteLayer, TextLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react/suspense";
import { Content, Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBaseOnHeight = height * scaleFactor;
  const fontSizeBaseOnWidth = width * scaleFactor;
  return Math.min(fontSizeBaseOnHeight, fontSizeBaseOnWidth, maxFontSize);
}

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Note = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: NoteProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage}, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);


  }, [])

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  }

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? colorToCSS(fill) : "#000",
      }}
      className="drop-shadow-xl shadow-md"
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        className={cn(
          "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? getContrastingTextColor(fill) : "#000",
        }}
      />
    </foreignObject>
  );
};
