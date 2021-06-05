type AdjacencyList = Record<string, number[]>;

class Graph {
  adjacencyList: AdjacencyList = {};

  addVertex(vertex: number): void {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(firstVertex: number, secondVertex: number): void {
    const list = this.adjacencyList;

    list[firstVertex].push(secondVertex);
    list[secondVertex].push(firstVertex);
  }
}

export { Graph };
