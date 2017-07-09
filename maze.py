'''
Maze Generator
By Stephen Davies

Builds a maze using tree construction
'''

# Current idea:
# - Build maze and tree at the same time
# - Start at some square - say (0, 0) for now - and randomly add unused square to leaves of the tree

import random
from collections import namedtuple
SquareNode = namedtuple('SquareNode', ['coord', 'children'])
Coordinate = namedtuple('Coordinate', ['x', 'y'])

class MazeTree(object):
    'A maze represented as a tree of squares (each with coordinates of their position in the maze)'
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.start_square = None
        self.end_square = None
        self.tree = None

    def __str__(self):
        '''
        Generate a string representation of the maze by starting with a maze with all walls,
        then removing walls while traversing the maze tree
        '''
        maze = [[' '] + self.width*['—', ' ']]
        for _ in range(self.height):
            maze += [
                ['|'] + self.width*['x', '|'],
                [' '] + self.width*['—', ' ']
            ]

        def remove_wall(coord1, coord2):
            'Remove wall between neighbouring squares at coord1 and coord2'
            coord = Coordinate(min(coord1.x, coord2.x), min(coord1.y, coord2.y))
            if coord1.x > coord.x or coord2.x > coord.x:
                maze[2*coord.y+1][2*coord.x+2] = ' '
            elif coord1.y > coord.y or coord2.y > coord.y:
                maze[2*coord.y+2][2*coord.x+1] = ' '
            else:
                print('Error: No wall removed for pair of coords ({0.x}, {0.y}) & ({1.x}, {1.y})'.format(coord1, coord2))

        def remove_walls(node):
            'Remove walls between node and its children'
            for child in node.children:
                remove_wall(node.coord, child.coord)
                remove_walls(child)

        remove_walls(self.tree)
        maze[2*self.start_square.y+1][2*self.start_square.x+1] = 'S'
        maze[2*self.end_square.y+1][2*self.end_square.x+1] = 'E'
        return '\n'.join(''.join(row) for row in maze)

    def list_paths(self):
        'Find all paths from the root node to leaf nodes'
        def generate_directed_paths(node):
            'Generate a list of directed paths from the given node to each leaf'
            if node.children:
                return [[node] + path for child in node.children for path in generate_directed_paths(child)]
            else:
                return [[node]]
        return generate_directed_paths(self.tree)

    @classmethod
    def generate_random_maze(cls, width, height):
        'Randomly generate maze by adding squares to the leaves of the maze'
        def get_neighbouring_coordinates(coord):
            'Get neighbouring coordinates that also lie in the rectangle'
            return (
                ([Coordinate(coord.x-1, coord.y)] if coord.x > 0 else []) +
                ([Coordinate(coord.x+1, coord.y)] if coord.x < width-1 else []) +
                ([Coordinate(coord.x, coord.y-1)] if coord.y > 0 else []) +
                ([Coordinate(coord.x, coord.y+1)] if coord.y < height-1 else [])
            )

        maze_tree = cls(width, height)
        maze_tree.start_square = Coordinate(0,0)
        maze_tree.tree = SquareNode(coord=maze_tree.start_square, children=[])
        tree_nodes = [maze_tree.tree]
        used_squares = set([maze_tree.tree.coord])
        while len(used_squares) < width*height:
            # Choose a square to add to the maze, and the node it should be added to
            all_choices = [(adjacent, node) for node in tree_nodes for adjacent in set(get_neighbouring_coordinates(node.coord)) - used_squares]
            next_square, node = random.choice(all_choices)
            # Create the new node and place it in the MazeTree
            new_node = SquareNode(coord=next_square, children=[])
            node.children.append(new_node)
            # Record the new node and the square it occupies
            tree_nodes.append(new_node)
            used_squares.add(next_square)
        # Now that the maze is built, choose the longest (break ties randomly) and use
        #  the leaf as the end square of the maze
        paths = maze_tree.list_paths()
        max_path_length = max(len(path) for path in paths)
        maze_path = random.choice([path for path in paths if len(path) == max_path_length])
        maze_tree.end_square = maze_path[-1].coord
        return maze_tree

def print_depth(node, depth):
    'Print the depth of every leaf node in the tree'
    if node.children:
        for child in node.children:
            print_depth(child, depth+1)
    else:
        print('Reached leaf at depth {}'.format(depth))



if __name__ == "__main__":
    mt = MazeTree.generate_random_maze(10,8)
    print(mt)
    print_depth(mt.tree, 0)
