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

  findLongestPath = (): number => {
    const list = this.adjacencyList;
    const vertecies = Object.keys(list);
    const visited: Record<string, boolean> = {};

    let longestPath = 0;
    let currentPathLength = 0;

    const depthFirstSearch = (vertex: number) => {
      const neighbors = list[vertex];
      const hasNeighbors = neighbors.length > 0;

      visited[vertex] = true;
      currentPathLength += 1;

      if (!hasNeighbors) {
        return;
      }

      neighbors.forEach((neighbor) => {
        if (!visited[neighbor]) {
          depthFirstSearch(neighbor);
        }
      });
    };

    vertecies.forEach((vertex) => {
      if (!visited[vertex]) {
        depthFirstSearch(Number(vertex));
      }

      if (currentPathLength > longestPath) {
        longestPath = currentPathLength;
      }

      currentPathLength = 0;
    });

    return longestPath;
  }
}

export { Graph };
