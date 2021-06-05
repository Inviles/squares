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

    const dfs = (vertex: any) => {
      visited[vertex] = true;

      currentPathLength += 1;

      if (list[vertex].length === 0) {
        return null;
      }

      list[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          return dfs(neighbor);
        }

        return null;
      });

      return null;
    };

    vertecies.forEach((vertex) => {
      if (!visited[vertex]) {
        dfs(vertex);
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
