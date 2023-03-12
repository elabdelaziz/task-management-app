import { useState } from "react";
import "./Aep.css";
function App() {
  const [widgets, setWidgets] = useState<string[]>([]);

  function handleOnDrag(e: React.DragEvent, widgetType: string) {
    e.dataTransfer.setData("widgetType", widgetType);
  }

  function handleOnDrop(e: React.DragEvent) {
    const widgetType = e.dataTransfer.getData("widgetType");
    console.log("widgetType", widgetType);
    setWidgets([...widgets, widgetType]);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  return (
    <div className="App">
      <div className="widgets">
        <div
          className=""
          draggable
          onDragStart={(e) => handleOnDrag(e, "widget A")}
        >
          Widget A
        </div>
        <div
          className=""
          draggable
          onDragStart={(e) => handleOnDrag(e, "widget B")}
        >
          Widget B
        </div>
        <div
          className=""
          draggable
          onDragStart={(e) => handleOnDrag(e, "widget C")}
        >
          Widget C
        </div>
      </div>
      <div className="page" onDrop={handleOnDrop} onDragOver={handleDragOver}>
        {widgets.map((widget, index) => (
          <div className="dropped-widget" key={index}>
            {widget}
          </div>
        ))}
      </div>
    </div>
  );
}
