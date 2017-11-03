import Ground from '../bricks/Ground';
import World from '../World';

export default function createGroundMesh(
    world:World,
):Ground{

    return new Ground(
        world,
        'grass'
    );
}