import json
import logging
from urllib import parse
from maze import MazeTree

log = logging.getLogger()
log.setLevel(logging.DEBUG)

def generate_maze(height, width):

    mzt = MazeTree.generate_random_maze(int(width),int(height))
    print (mzt)

    return mzt.to_json()




def handler(event, context):
    log.debug("Received event {}".format(json.dumps(event)))
    height = event['queryStringParameters'].get('height')
    width = event['queryStringParameters'].get('width')
    log.debug('MAZE {} x {}'.format(width, height))
    message = ""
    message = generate_maze(height, width)
    log.debug(message)
    return {
        'statusCode': 200,
        'headers': {
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': '*'
        },
        'body': message
    }