class Blobservation {
    constructor(height, width) {
        this.blobs = [];
        this.remainingSteps = 0;
        this.height = height;
        this.width = width || height;
        this.board = JSON.parse(JSON.stringify([...new Array(this.height)].fill([...new Array(this.width).fill(0)])));
    }

    populate(blobs) {
        this.validateBlobs(blobs);
        this.combineBlobs(blobs, false);
    }

    move(steps = 1) {
        if (typeof steps !== "number" || steps < 0) {
            throw new Error("Not a valid number!");
        }

        this.remainingSteps = steps;
        this.calculateNextPositions();
    }

    print_state() {
        return this.blobs.map((b) => [b.x, b.y, b.size]);
    }

    validateBlobs(blobs) {
        if (!Array.isArray(blobs)) {
            throw new Error("Not an array");
        }

        if (blobs.length === 0) {
            throw new Error("Array is empty");
        }

        if (
            !Array.isArray(blobs) ||
            blobs.some(
                (blob) => typeof blob.x !== "number" || typeof blob.y !== "number" || typeof blob.size !== "number"
            )
        ) {
            throw new Error("Invalid blobs!");
        }
    }

    calculateNextPositions() {
        let smallestBlob;
        let blobsToMove;
        let nextBlobs;

        this.blobs.forEach(
            (blob) =>
                (smallestBlob =
                    blob.size < smallestBlob || typeof smallestBlob === "undefined" ? blob.size : smallestBlob)
        );

        blobsToMove = this.blobs.filter((blob) => blob.size > smallestBlob);
        nextBlobs = this.blobs.filter((blob) => blob.size === smallestBlob);

        blobsToMove.forEach((blob, i) => {
            let targets = this.blobs.filter((target) => blob.x !== target.x || blob.y !== target.y);
            let minDistance;
            let maxSize;

            targets = targets.map((target, j) => ({
                ...target,
                distance: this.calculateDistance(blob.x, blob.y, target.x, target.y)
            }));

            // only target smaller size
            targets = targets.filter((t) => t.size < blob.size);

            // only count closest
            targets.forEach(
                (t) =>
                    (minDistance =
                        t.distance < minDistance || typeof minDistance === "undefined" ? t.distance : minDistance)
            );
            targets = targets.filter((t) => t.distance === minDistance);

            // pick the biggest from the closest
            targets.forEach((t) => (maxSize = t.size > maxSize || typeof maxSize === "undefined" ? t.size : maxSize));
            targets = targets.filter((t) => t.size === maxSize);

            // handle equal size blobs in the same distance (clockwise)
            targets = targets.map((t) => ({ ...t, angle: this.getAngle(blob.x, blob.y, t.x, t.y) }));
            targets.sort((a, b) => a.angle - b.angle);

            // push new position
            nextBlobs.push({
                ...this.getNewPosition(blob.x, blob.y, targets[0].x, targets[0].y),
                size: blob.size
            });
        });

        this.combineBlobs(nextBlobs);
        this.remainingSteps--;

        if (this.remainingSteps > 0) {
            this.calculateNextPositions();
        }
    }

    calculateDistance(sx, sy, tx, ty) {
        const dx = Math.abs(tx - sx);
        const dy = Math.abs(ty - sy);
        const diagonal = Math.min(dx, dy);
        const straight = Math.max(dx, dy) - diagonal;

        return diagonal + straight;
    }

    getNewPosition(sx, sy, tx, ty) {
        const dx = tx - sx;
        const dy = ty - sy;
        const mx = dx === 0 ? 0 : dx > 0 ? 1 : -1;
        const my = dy === 0 ? 0 : dy > 0 ? 1 : -1;

        return { x: sx + mx, y: sy + my };
    }

    combineBlobs(nextBlobs, shouldReplace = true) {
        if (shouldReplace) {
            this.board = JSON.parse(
                JSON.stringify([...new Array(this.height)].fill([...new Array(this.width).fill(0)]))
            );
        }

        nextBlobs.forEach((b) => (this.board[b.x][b.y] += b.size));
        this.blobs = this.flatten(
            this.board.map((row, x) =>
                row
                    .map((size, y) => ({
                        x,
                        y,
                        size
                    }))
                    .filter((b) => b.size !== 0)
            )
        );
    }

    flatten(input) {
        const result = [];

        if (Array.isArray(input)) {
            input.forEach((i) => {
                this.flatten(i).forEach((j) => result.push(j));
            });
        } else {
            result.push(input);
        }

        return result;
    }

    getAngle(sx, sy, tx, ty) {
        const dx = tx - sx;
        const dy = ty - sy;
        let theta = Math.atan2(dx, dy);

        theta *= 180 / Math.PI;
        theta += 90;

        return theta < 0 ? 360 + theta : theta;
    }
}

const generation0 = [
    { x: 0, y: 4, size: 3 },
    { x: 0, y: 7, size: 5 },
    { x: 2, y: 0, size: 2 },
    { x: 3, y: 7, size: 2 },
    { x: 4, y: 3, size: 4 },
    { x: 5, y: 6, size: 2 },
    { x: 6, y: 7, size: 1 },
    { x: 7, y: 0, size: 3 },
    { x: 7, y: 2, size: 1 }
];
const generation1 = [
    { x: 3, y: 6, size: 3 },
    { x: 8, y: 0, size: 2 },
    { x: 5, y: 3, size: 6 },
    { x: 1, y: 1, size: 1 },
    { x: 2, y: 6, size: 2 },
    { x: 1, y: 5, size: 4 },
    { x: 7, y: 7, size: 1 },
    { x: 9, y: 6, size: 3 },
    { x: 8, y: 3, size: 4 },
    { x: 5, y: 6, size: 3 },
    { x: 0, y: 6, size: 1 },
    { x: 3, y: 2, size: 5 }
];
const generation2 = [
    { x: 5, y: 4, size: 3 },
    { x: 8, y: 6, size: 15 },
    { x: 1, y: 4, size: 4 },
    { x: 2, y: 7, size: 9 },
    { x: 9, y: 0, size: 10 },
    { x: 3, y: 5, size: 4 },
    { x: 7, y: 2, size: 6 },
    { x: 3, y: 3, size: 2 }
];

const generationclockwise = [
    { x: 0, y: 0, size: 1 },
    { x: 0, y: 1, size: 1 },
    { x: 0, y: 2, size: 1 },
    { x: 1, y: 2, size: 1 },
    { x: 2, y: 2, size: 1 },
    { x: 2, y: 1, size: 1 },
    { x: 2, y: 0, size: 1 },
    { x: 1, y: 0, size: 1 },
    { x: 1, y: 1, size: 2 }
];

const blobs = new Blobservation(10, 8);
blobs.populate(generation1);
blobs.move();
blobs.move(2);
blobs.move(2);
console.log(blobs.print_state());
blobs.populate(generation2);
console.log(blobs.print_state());
