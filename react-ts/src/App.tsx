import React from 'react';
import './App.css';

interface AppProps { }
interface AppState { }

class App extends React.Component<AppProps, AppState> {
  private containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: AppProps) {
    super(props);
    this.state = {};
    this.containerRef = React.createRef();
  }

  componentDidMount() {

    if (!mxClient.isBrowserSupported()) {
      mxUtils.error("Browser is not supported!", 200, false);
    } else {

      const graph = new mxGraph(this.containerRef.current!);

      graph.setPanning(true);
      mxEvent.disableContextMenu(this.containerRef.current!);
      new mxRubberband(graph);

      const model = graph.getModel();
      const parent = graph.getDefaultParent();
      model.beginUpdate();
      try {
        const cell1 = graph.insertVertex(parent, '', 'React', 0, 0, 100, 100);
        const cell2 = graph.insertVertex(parent, '', 'mxGraph', 200, 200, 100, 100);
        graph.insertEdge(parent, '', 'with', cell1, cell2);
      } finally {
        model.endUpdate();
      }
    }

  }


  render() {
    return (<div ref={this.containerRef} className="diagram-container"></div>)
  }
}

export default App;
