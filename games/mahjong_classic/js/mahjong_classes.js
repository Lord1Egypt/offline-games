
const maxLayersCount = 5;

class GridCell
{
    constructor (scene, offsetX, offsetY, cellTexture, parent, depth, editMode)
    {
        this.scene = scene;
        this.parent = parent;
        this.pointerUpEvent = new MKEvent();
        this.pointerDownEvent = new MKEvent();   
        this.depth = depth;

        this.cellSprite = scene.addSpriteToContainerLocPos(cellTexture, parent, offsetX, offsetY);       
        this.cellSprite.setOrigin(0.5,0.5);
        this.cellSprite.depth = depth;

        this.cellSprite.on('pointerdown',this.pointerDown,this);        // this.cellSprite.on('pointerover',this.pointerOver,this);
        this.cellSprite.on('pointerup',this.pointerUp,this);            // this.cellSprite.on('pointerout',this.pointerOut,this);
        this.pDown = false;

        if(editMode){ this.cellSprite.setInteractive();} else {this.cellSprite.removeInteractive();}
        this.cellSprite.setVisible(editMode);
        this.tiles = [];
        this.tiles.length = maxLayersCount;
        this.neighbors = null;
    }

    init(cellRow, cellColumn, gColumn, gRow, matchGrid)
    {
        this.row = cellRow;
        this.column = cellColumn;
        this.gRow = gRow;
        this.gColumn = gColumn;
        this.mGrid = matchGrid;
        this.addRenderOrder =  (gRow != null && gColumn != null) ? (cellRow * gColumn.length + cellColumn) : 0;
        this.neighbors = new NeighBors(this);
    }

    pointerUp() 
    {
        this.pDown = false;    
        if(!this.mGrid.interactable) return;
        if(!this.pDown) return;   
        this.pointerUpEvent.invoke();
    }

    pointerDown() 
    {   
        if(!this.mGrid.interactable) return;
        this.pDown = true;
        this.pointerDownEvent.invoke();   
    }

    toString()
    {
        return 'cell : [ row: ' + this.row + ' ,col: ' + this.column + ']';
    }

    setObject(tConfig, layer)
    {
        var tile = new MahjongTile(tConfig, this, layer);
        this.tiles[layer] = tile;
        return tile;
    }

    removeObject(layer)
    {
        this.cellSprite.setVisible(this.editMode);
        var tile = this.getLayerObject(layer, false);        
        if (tile != null){
            this.tiles[layer].destroy();
            delete this.tiles[layer];
            this.tiles[layer] = null;                  
        }
    }

    unLinkObject(layer)
    {
        this.cellSprite.setVisible(this.editMode);
        var tile = this.getLayerObject(layer, false);  
        if (tile != null){
            this.tiles[layer] = null;
            // tile.parentCell = null;                
        }
    }

    getGridObjects()
    {
        var gObjects = [];
        this.tiles.forEach((t)=>{if (t != null) gObjects.push(t); });
        return gObjects;
    }

    getLayerObject(layer, andProxy)
    {
        if (!andProxy) return this.tiles[layer];

        var gridObjectH = null;
        var _length = this.mGrid.cells.length;
        for(var si = 0; si < _length; si++){
            var c = this.mGrid.cells[si];
            gridObjectH = c.tiles[layer];
            if (gridObjectH != null){
                var occupiedCells = gridObjectH.getOccupiedCells(null);
                if (occupiedCells.includes(this)) return gridObjectH;
            }
        }
        return null;
    }

    destroyGridObjects(){
        var objects = this.getGridObjects();
        objects.forEach((o)=>{
            this.removeObject(o.layer);
        });
    }

}

class MahjongTile
{
    constructor (tConfig, gridCell, layer)
    {
        this.scene = gridCell.scene;
        this.mGrid = gridCell.mGrid;
        this.layer = layer;
        this.parentCell = gridCell;
        this.scene = gridCell.scene;
        this.tConfig = tConfig;
        this.occupiedRows = tConfig.sizeY;
        this.occupiedCols = tConfig.sizeX;

        // set sprite over gridcell (world coordinats) and scale as gridcell parent ()
        const { tx, ty } = gridCell.cellSprite.getWorldTransformMatrix();
        this.lossyScale = gridCell.parent.scale;
        var offsetX = tConfig.layerOffsetX * this.lossyScale * layer;
        var offsetY = tConfig.layerOffsetY * this.lossyScale * layer;
        this.tileSprite = this.scene.add.sprite(tx + offsetX, ty + offsetY, 'tile_empty').setOrigin(0.25, 0.75).setScale(this.lossyScale);  // this.scene.addSpriteToContainerLocPos('tile_empty', gridCell.container, 0, 0).setOrigin(0.25, 0.75);   
        this.shadowSprite = this.scene.add.sprite(tx + offsetX, ty + offsetY, 'tile_shadow').setOrigin(0.32, 0.69).setScale(this.lossyScale);   
        this.leftBorder = this.scene.add.sprite(tx + offsetX, ty + offsetY, tConfig.leftBorderTexture).setOrigin(0.25, 0.75).setScale(this.lossyScale);   
        this.excluded = false;
        this.hint_sheet = 'hint_anim';
        this.select_sheet = 'select_anim';
        this.highlightedHint = false;
        this.highlightedSel = false;
        this.editMode = this.parentCell.editMode;
        this.tileSprite.setInteractive();

        if (!this.editMode)
        {
            this.tileSprite.on('pointerdown',this.pointerDown,this);
            this.tileSprite.on('pointerup',this.pointerUp,this); 
        }
        else
        {
            this.tileSprite.on('pointerdown', this.pointerDown,this);
        }
    }

    pointerDown()
    {
        if(!this.mGrid.interactable) return;
        if (!this.editMode)
        {
            // console.log("pointer down: " + this.textureKey);
            // console.log("boundsL:"); console.log(this.getBoundsL());
            // console.log("boundsW:"); console.log(this.getBoundsW());
            // console.log("posW:"); console.log(this.getPositionW());
            // console.log("posL:"); console.log(this.getPositionL());
            //this.mayBeDeselect = false;
            this.wasDragged = false;

            if (this.isFreeToMatch()) {
                if (mFirstSelected === this) {
                    mFirstSelected = null ;
                    this.highlightSelected(false);
                    return;
                }
                else if (mFirstSelected != null && mFirstSelected != this)      // is probably second object
                {
                    if (this.canMatchWith(mFirstSelected)) {
                        this.highlightSelected(true);
                        this.matchWith(mFirstSelected);
                        mFirstSelected = null;
                        return;
                    }
                    else {
                        mFirstSelected.highlightSelected(false);               
                        mFirstSelected = null;                             
                        this.scene.failedMatch();
                        return;
                    }
                }
                mFirstSelected = this;
                this.highlightSelected(true);
            }
            else // failed match select
            {
                if(mFirstSelected != null ) mFirstSelected.highlightSelected(false); ;
                mFirstSelected = null;
                this.scene.failedMatch();
            }
        }
        else    // edit mode
        {
        }
    }
    
    pointerUp(){
//        console.log("pointer up: " + this.textureKey);
        if(!this.mGrid.interactable) return;
        if (mFirstSelected == null) return;
        if (!this.wasDragged) return;

        if (mFirstSelected === this && !this.wasDragged) 
        { 
//            console.log("pointer up: mFirstSelected === this");
            if (this.mayBeDeselect == true) {
                mFirstSelected = null ; 
                this.highlightSelected(false);
                return; 
            } 
        }
        else if (mFirstSelected === this  && this.wasDragged) {
            return;
        }
    
        if (this.canMatchWith(mFirstSelected)) {
            this.highlightSelected(true);
            this.matchWith(mFirstSelected);
        }
        else {
            if (mFirstSelected != this)
            {
                this.scene.failedMatch();
            }
        }
    }

    getRenderOrder(onFront)
    {
        var layerOrder = (onFront) ? 20000 : this.layer * 2000;
        var addOrder = (this.parentCell != null) ? this.parentCell.addRenderOrder : 0;
        if (onFront)
            return this.tConfig.frontDepth + addOrder + layerOrder;
        else
           return this.tConfig.depth + addOrder + layerOrder;
    }

    setToFront(toFront)
        {
            this.tileSprite.depth = this.getRenderOrder(toFront);
            if (this.shadowSprite!=null) this.shadowSprite.depth = (toFront) ? 20000 - 1: this.layer * 2000;
            // set border
            if (toFront) {
                this.leftBorder.setVisible(false);
            }
            else {
                this.enableLeftBorder();
            }
    }

    enableLeftBorder()
    {
        var bL = this.getBottomLeftBlocker();
        if(bL != null) {
            var rO = bL.getRenderOrder(false);
            this.leftBorder.depth = rO + 1;
            this.leftBorder.setVisible(true);
        }
        else {
            this.leftBorder.setVisible(false);
        }
    }

    getBottomLeftBlocker()
    {
        var neighBors = this.parentCell.neighbors;
        var l1 = (neighBors.left_1 != null) ? neighBors.left_1.getLayerObject(this.layer, true) : null;
        var l2 = (neighBors.left_2 != null) ? neighBors.left_2.getLayerObject(this.layer, true) : null;
        if (l2 && (l1 != l2)) return l2;
        return null;
    }

    isFreeToMatch()
    {
        var neighBors = this.parentCell.neighbors;
        // over
        var overLayer = this.layer + 1;
        var ov = (neighBors.main_1 != null) ? neighBors.main_1.getLayerObject(overLayer, true) : null;
        if (ov != null) return false;
        ov = (neighBors.main_2 != null) ? neighBors.main_2.getLayerObject(overLayer, true) : null;
        if (ov != null) return false;
        ov = (neighBors.main_3 != null) ? neighBors.main_3.getLayerObject(overLayer, true) : null;
        if (ov != null) return false;
        ov = (neighBors.main_4 != null) ? neighBors.main_4.getLayerObject(overLayer, true) : null;
        if (ov != null) return false;
        // left
        var tLayer = this.layer;
        var l1 = (neighBors.left_1 != null) ? neighBors.left_1.getLayerObject(tLayer, true) : null;
        var l2  = (neighBors.left_2 != null) ? neighBors.left_2.getLayerObject(tLayer, true) : null;
        var leftBlocked1 = (l1 != null);
        var leftBlocked2 = (l2 != null);
        var leftBlocked = leftBlocked1 || leftBlocked2;
        if (!leftBlocked) return true;
        // right
        var r1 = (neighBors.right_1 != null) ? neighBors.right_1.getLayerObject(tLayer, true) : null;
        var r2 = (neighBors.right_2 != null) ? neighBors.right_2.getLayerObject(tLayer, true) : null;
        var rightBlocked1 = (r1 != null);
        var rightBlocked2 = (r2 != null);
        var rightBlocked = rightBlocked1 || rightBlocked2;
        if (!rightBlocked) return true;
        return false;
    }

    isFreeToFill(){
        var neighBors = this.parentCell.neighbors;
        // over
        var o1 = (neighBors.main_1 != null) ? neighBors.main_1.getLayerObject(this.layer + 1, true) : null;
        var o2 = (neighBors.main_2 != null) ? neighBors.main_2.getLayerObject(this.layer + 1, true) : null;
        var o3 = (neighBors.main_3 != null) ? neighBors.main_3.getLayerObject(this.layer + 1, true) : null;
        var o4 = (neighBors.main_4 != null) ? neighBors.main_4.getLayerObject(this.layer + 1, true) : null;
        var overBlocked1 = (o1 !== null && !o1.excluded);
        var overBlocked2 = (o2 !== null && !o2.excluded);
        var overBlocked3 = (o3 !== null && !o3.excluded);
        var overBlocked4 = (o4 !== null && !o4.excluded);
        var overBlocked = (overBlocked1 || overBlocked2 || overBlocked3 || overBlocked4);
        if (overBlocked) return false;

        // left
        var l1 = (neighBors.left_1 != null) ? neighBors.left_1.getLayerObject(this.layer, true) : null;
        var l2  = (neighBors.left_2 != null) ? neighBors.left_2.getLayerObject(this.layer, true) : null;
        var leftBlocked1 = (l1 != null && !l1.excluded);
        var leftBlocked2 = (l2 != null && !l2.excluded);
        var leftBlocked = leftBlocked1 || leftBlocked2;
        if (!leftBlocked) return true;

        // right
        var r1 = (neighBors.right_1 != null) ? neighBors.right_1.getLayerObject(this.layer, true) : null;
        var r2 = (neighBors.right_2 != null) ? neighBors.right_2.getLayerObject(this.layer, true) : null;
        var rightBlocked1 = (r1 != null && !r1.excluded);
        var rightBlocked2 = (r2 != null && !r2.excluded);
        var rightBlocked = rightBlocked1 || rightBlocked2;
        if (!rightBlocked) return true;

        return false;
    }

    setExcluded(excluded){
        this.excluded = excluded;
    }

    getOccupiedCells(gCell){
        if(gCell == null) gCell = this.parentCell;
        var res = [];
        var cRow = gCell.row;
        var cCol = gCell.column;
        var mGrid = gCell.mGrid;
        var _gCell;
        for (var r = cRow; r > cRow - this.occupiedRows; r--)
        {
            for (var c = cCol; c < cCol + this.occupiedCols; c++)
            {
                _gCell = mGrid.getCell(r, c);
                if (_gCell != null) res.push(_gCell);
            }
        }
        return res;
    }

    setSprite(textureKey){
        this.tileSprite.setTexture(textureKey);
        this.textureKey = textureKey;
    }

    getSize (){
        return new Phaser.Math.Vector2(this.occupiedCols, this.occupiedRows);
    }

    canMatchWith(otherTile){
        if(this === otherTile) return false;
        return this.textureKey === otherTile.textureKey || ThemeHolder.isOneGroup(goSet, this.textureKey, otherTile.textureKey);
    }

    matchWith(otherTile)
    {
        this.scene.collectMatch(this, otherTile);
    }

    setFreeHiglightColor(highLight)
    {
        this.tileSprite.setTint(highLight ? 0xffffff : 0xB2CCB2); 
        if (this.leftBorder != null) this.leftBorder.setTint(highLight ? 0xffffff : 0xB2CCB2 );
    }

    highlightHint(highlight)
    {
        if (this.highlightedHint == highlight) return;
        if (highlight) {
            if(this.hintAnim == null)
            {           
                this.hintAnim = this.scene.add.sprite(this.tileSprite.x, this.tileSprite.y, this.hint_sheet).setOrigin(0.32, 0.7).setScale(this.lossyScale).play({ key: 'hint'});  // , frameRate : this.frameRate
                this.hintAnim.depth = this.getRenderOrder(true) + 2;
            }
        }
        else {
            if(this.hintAnim !== null){ this.hintAnim.stop();  this.hintAnim.destroy();}
            this.hintAnim = null;
        }
        this.highlightedHint = highlight;
    }

    highlightSelected(highlight)
    {
        if (this.highlightedSel == highlight) return;
        if (highlight) {
            if (this.selectAnim == null)
            {
                this.selectAnim = this.scene.add.sprite(this.tileSprite.x, this.tileSprite.y, this.select_sheet).setOrigin(0.25, 0.75).setScale(this.lossyScale).play({ key: 'select'});  // , frameRate : this.frameRate
                this.selectAnim.depth = this.getRenderOrder(true) + 1;
                if(this.scene.tileSelectHandler)  this.scene.tileSelectHandler();
            }
        }
        else {
            if(this.selectAnim !== null){this.selectAnim.stop();  this.selectAnim.destroy();}
            this.selectAnim = null;
        }
        this.setToFront(highlight);
        this.highlightedSel = highlight;
    }

    destroy(){
        this.highlightSelected(false);
        this.highlightHint(false);
        this.destroySprite(this.tileSprite); 
        this.destroySprite(this.shadowSprite); 
        this.destroySprite(this.leftBorder); 
    }

    destroySprite(sprite)
    {
        if(sprite!=null) sprite.destroy();
    }

    // return Vector2 sprite world position
    getPositionW(){
        const { tx, ty } = this.tileSprite.getWorldTransformMatrix();
        return new Phaser.Math.Vector2(tx, ty);
    }

    // return Vector2 sprite world position
    getPositionL(){
        return new Phaser.Math.Vector2(this.tileSprite.x, this.tileSprite.y);
    }

    // set Vector2 sprite local position
    setPositionL(positionV2){
        this.tileSprite.setPosition(positionV2.x, positionV2.y); 
        this.shadowSprite.setPosition(positionV2.x, positionV2.y);    
        this.leftBorder.setPosition(positionV2.x, positionV2.y);    
        if(this.selectAnim != null) this.selectAnim.setPosition(positionV2.x, positionV2.y);  
        if(this.hintAnim != null) this.hintAnim.setPosition(positionV2.x, positionV2.y); 
    }

    // world bounds
    getBoundsW(){
        const bounds = this.tileSprite.getBounds();
        return bounds;
    }

    // local bounds
    getBoundsL(){
        const bounds = Phaser.Display.Bounds.GetBounds(this.tileSprite);
        return bounds;
    }

    mixJump(toPosition, completeCallBack)
    {
        if (this.hintAnim != null) this.highlightHint(false);
        if (this.selectAnim != null) this.highlightSelected(false);
        this.positionL = this.getPositionL();
        new SimpleTweenVector2(this, this.positionL, toPosition, 500,                                            
            (p, dp) =>{ this.setPositionL(p); },   
            ()=> { completeCallBack(); });
    }

    reversMixJump(completeCallBack)
    {
        new SimpleTweenVector2(this, this.getPositionL(), this.positionL,500,                                            
            (p, dp) =>{ this.setPositionL(p); },   
            ()=> { completeCallBack(); });
    }
}

class MatchGrid
{
    constructor (scene, lcSetJson, offsetX, offsetY, gConfig, depth, editMode) {
        this.scene = scene;
        this.gConfig = gConfig;
        this.lcSetJson = lcSetJson;
        this.editMode = editMode;
        this.vertSize = lcSetJson.vertSize;
        this.horSize = lcSetJson.horSize;
        this.scale = lcSetJson.scale;
        this.deltaX = lcSetJson.distX;
        this.deltaY = lcSetJson.distY;
        this.cellSizeX = gConfig.cellSizeX;
        this.cellSizeY = gConfig.cellSizeY;

        this.cellTexture = gConfig.cellTextureName;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.depth = depth;
        this.cells = [];
        this.rows = [];
        this.columns = [];

        this.yOffset = 0;
        this.xStep = (this.cellSizeX + this.deltaX);
        this.yStep = (this.cellSizeY + this.deltaY);
        this.cOffset = (1 - this.horSize) * this.xStep / 2.0; // offset from center by x-axe
        this.yStart = (1 - this.vertSize) * this.yStep / 2.0;

        this.cellsParent = scene.addContainerLocPos(offsetX, offsetY);
        this.cellsParent.setScale(this.scale);
        //console.log(this.cellsParent);
 
        for (var i = 0; i < this.vertSize; i++) {      //instantiate cells
            this.addRow();
        }
        this.initCells();
        this.interactable = true;
    }

    initCells() {
        for (var r = 0; r < this.rows.length; r++)
        {
            for (var c = 0;  c < this.rows[r].length; c++)
            {
                this.rows[r].getByIndex(c).init(r, c, this.columns[c], this.rows[r], this);
            }
        }
    }

    addRow() {      
        var row = new Row(this.horSize);
        // create row cells
        for (var j = 0; j < row.length; j++) {
            var posX = j * this.xStep + this.cOffset;
            var posY = this.yStart + this.yOffset * this.yStep;
            var cell = new GridCell(this.scene, posX, posY, this.cellTexture, this.cellsParent, this.depth, this.editMode);
            this.cells.push(cell);
            row.setByIndex(j, cell);
        }
        this.rows.push(row);

        // cache columns
        this.columns = [];
        for (var c = 0; c < this.horSize; c++) {
            var column = new Column(this.vertSize);
            for (var r = 0; r < this.rows.length; r++) {
                column.setByIndex(r, this.rows[r].getByIndex(c));
            }
            this.columns.push(column);
        }
        this.yOffset++;
    }

    getCell(index0, index1)
    {
        {if (this.ok(index0, index1)) { return this.rows[index0].getByIndex(index1); } else { return null; } }
    }

    ok(index0, index1)
    {
        return (index0 >= 0 && index0 < this.vertSize && index1 >= 0 && index1 < this.horSize);
    }

    setObjectsData(countLimit)
    {
        this.tiles = [];
        if (countLimit < 0) countLimit = 1000000;   //tiles count -> any to big value 
        let setCells = this.lcSetJson.cells; // from json
        if (setCells != null)
        {
            var canSetNextLayer = true;
            for (var layer = 0; layer < maxLayersCount; layer++)
            {
                if (canSetNextLayer) {
                    canSetNextLayer = false;
                    var objectsCount = 0;
                    setCells.forEach((c)=> {
                        if (c != null && c.gridObjects != null)
                        {
                            c.gridObjects.forEach ((o)=>
                            {
                                if (c.row >= 0 && c.column >= 0 && c.row < this.rows.length && c.column < this.rows[c.row].length && o.layer == layer && this.tiles.length < countLimit)
                                {
                                    var _tile  = this.rows[c.row].getByIndex(c.column).setObject(tileConfig, layer);
                                    if (_tile)
                                    {
                                        this.tiles.push(_tile);
                                        objectsCount++;
                                        canSetNextLayer = true;
                                    }
                                }
                            });
                        }
                    });
//                    console.log('Layer #' + layer + '; objects count: ' + objectsCount);
                }
            }

            // remove the last odd tile
            if (!this.editMode && this.tiles.length % 2 != 0) {
                var mahjongTile = this.tiles[this.tiles.length - 1];
                mahjongTile.parentCell.removeObject(mahjongTile.layer);
                this.tiles.pop();
            }
        }
    }

    setTofrontAll(setTofront)
    {
        var tiles = this.getTiles();
        for (var i = 0; i < tiles.length; i++) {
          tiles[i].setToFront(setTofront);
        }
    }

    getTiles()
    {
        var tiles = [];
        this.cells.forEach((c)=>{
            var cTiles = c.getGridObjects();
            tiles = tiles.concat(cTiles);
        });
        return tiles;
    }

    getLayerObjects(layer)
    {
        var tiles = getTiles();
        return tiles.filter((t) => {return t.layer != layer;});;
    }

    getFreeToMatchTiles()
    {
        var tiles = this.getTiles();
        return tiles.filter((t) => { return t.isFreeToMatch(); });
    }

    getMaxLayer()
    {
        var maxLayer = 0;
        var tiles = getTiles();
        tiles.forEach ((t)=>
        {
            if (t.layer > maxLayer) maxLayer = t.layer;
        })
        return maxLayer;
    }

    getFreeToFillTiles(fromTiles, shuffle, sortByLayerReverse)
    {
        var result = fromTiles.filter((t)=>{return t != null;});
        result = result.filter((t) => { return !t.excluded; });
        result = result.filter((t) => { return t.isFreeToFill(); });
        if (shuffle) Phaser.Utils.Array.Shuffle(result);
        if (sortByLayerReverse) result.sort((a,b) =>{return b.layer - a.layer;});
        return result;
    }

    setMahjongSprites()
    {
        // set majong sprites
        var sprites = ThemeHolder.getRandomPairs(goSet, this.tiles.length / 2, lcSet.fillType);
        var tT = []; 
        tT = tT.concat(this.tiles); // copi arry

//        console.log("set sprites, tiles count: " + this.tiles.length);
//        console.log( "sprites pairs count: " + sprites.length + "; " + lcSet.fillType);

        // 1 type - get random from free to fill tiles
        var failed = false;
        for (var i = 0; i < tT.length; i += 2) {
            var freeTiles = this.getFreeToFillTiles(this.tiles, true, false);      // not sorted by layer
            if(freeTiles.length < 5) freeTiles = this.getFreeToFillTiles(this.tiles, true, true); // avoid last error (tile 0 over tile)
            if(freeTiles.length == 1) {
                failed = true;
                break;
            }
            var t1 = freeTiles[0];
            var t2 = freeTiles[1];
            t1.setExcluded(true);
            t2.setExcluded(true);
            var sP = sprites[i / 2];
            t1.setSprite(sP.textureKey_1);
            t2.setSprite(sP.textureKey_2);
        }
        if (!failed) {
//        console.log("1 sampling type used.");
         return; }

        // 2 type -  get first from most top layer, second from most bottom layer
        if (failed)
        {
            this.tiles.forEach((t) => { t.setExcluded(false); });
            for (var i = 0; i < tT.length; i += 2) {
                var freeTiles = this.getFreeToFillTiles(this.tiles, true, true); // reverse sorted
                if (freeTiles.length == 1) {
                    failed = true;
                    break;
                }
                var t1 = freeTiles[0];
                var t2 = freeTiles[freeTiles.length - 1];
                freeTiles[0].setExcluded(true);
                freeTiles[1].setExcluded(true);
                var sP = sprites[i/2];
                t1.setSprite(sP.textureKey_1);
                t2.setSprite(sP.textureKey_2);
            }
        }
        if (!failed) {
//         console.log("2 sampling type used.");
          return; }

        // 3 type - get 2 tiles from most top layers
        if (failed)
        {
            this.tiles.forEach((t)=> { t.setExcluded(false); });
            failed = false;
            for (var i = 0; i < tT.length; i += 2) {
                var freeTiles = this.getFreeToFillTiles(this.tiles, true, true); // reverse sorted
                if (freeTiles.length == 1) {
                    failed = true;
                    break;
                }
                var t1 = freeTiles[0];
                var t2 = freeTiles[1];
                freeTiles[0].setExcluded(true);
                freeTiles[1].setExcluded(true);
                var sP = sprites[i / 2];
                t1.setSprite(sP.textureKey_1);
                t2.setSprite(sP.textureKey_2);
            }
        }
//        if (!failed) console.log("3 sampling type used.");
//        else console.error("Fill failed, make changes in game board.");
    }

    canShuffle()
    {
        var mahjongTiles = this.getTiles();
        mahjongTiles.forEach((t) => { t.setExcluded(false); });
        var freeTiles = [];
        for (var i = 0; i < mahjongTiles.length; i += 2) {
            freeTiles = this.getFreeToFillTiles(mahjongTiles, false, false);
            if (freeTiles.length == 1) {
                return false;
            }
            freeTiles[0].setExcluded(true);
            freeTiles[1].setExcluded(true);
        }
        return true;
    }

    shuffleGridSprites() {
            var mahjongTiles = this.getTiles();
            mahjongTiles.forEach((t)=> { t.setExcluded(false);});
            var spritesPairs = [];

            while (mahjongTiles.length > 0)   // get the list of match pairs
            {
                var mTile = mahjongTiles[0];
                Phaser.Utils.Array.RemoveAt(mahjongTiles, 0);

                var pairTile = null;
                var index = 0;
                for (var i = 0; i < mahjongTiles.length; i++) {
                    var item = mahjongTiles[i];
                    if (mTile.canMatchWith(item)) {
                        pairTile = item;
                        index = i;
                        var freePaar = new SpritesPair(mTile.textureKey, item.textureKey);
                        spritesPairs.push(freePaar);
                        break;
                    }
                }
                Phaser.Utils.Array.RemoveAt(mahjongTiles, index);
            }

            mahjongTiles = this.getTiles();
            var failed = false;
            for (var i = 0; i < spritesPairs.length; i++) {
                var item = spritesPairs[i];
                var freeTiles = this.getFreeToFillTiles(mahjongTiles, true, true); // reverse sorted
                if (freeTiles.length == 1) {
                    failed = true;
                    break;
                }
                var t1 = freeTiles[0];
                var t2 = freeTiles[1];
                t1.setExcluded(true);
                t2.setExcluded(true);
                t1.setSprite(item.textureKey_1);
                t2.setSprite(item.textureKey_2);
            }
            if(failed) console.error("!!! MIX FAILED !!!");
    }

    hardShuffle()
    {
        var mahjongTiles = this.getTiles();
        mahjongTiles.forEach((t)=> { t.setExcluded(false);});
        var spritesPairs = [];

        while (mahjongTiles.length > 0)   // get the list of match pairs
        {
            var mTile = mahjongTiles[0];
            Phaser.Utils.Array.RemoveAt(mahjongTiles, 0);

            var pairTile = null;
            var index = 0;
            for (var i = 0; i < mahjongTiles.length; i++) {
                var item = mahjongTiles[i];
                if (mTile.canMatchWith(item)) {
                    pairTile = item;
                    index = i;
                    var freePaar = new SpritesPair(mTile.textureKey, item.textureKey);
                    spritesPairs.push(freePaar);
                    break;
                }
            }
            Phaser.Utils.Array.RemoveAt(mahjongTiles, index);
        }

        // rebuild grid objects
        this.cells.forEach((c) => { c.destroyGridObjects(); });
        var tilesCount = spritesPairs.length * 2;
        this.setObjectsData(tilesCount);

        mahjongTiles = this.getTiles();
        mahjongTiles.forEach((t)=> { t.setExcluded(false);});
        var failed = false;
        for (var i = 0; i < spritesPairs.length; i++) {
            var item = spritesPairs[i];
            var freeTiles = this.getFreeToFillTiles(mahjongTiles, true, true); // reverse sorted
            if (freeTiles.length == 1) {
                failed = true;
                break;
            }
            var t1 = freeTiles[0];
            var t2 = freeTiles[1];
            t1.setExcluded(true);
            t2.setExcluded(true);
            t1.setSprite(item.textureKey_1);
            t2.setSprite(item.textureKey_2);
        }
        if(failed) console.error("!!! MIX FAILED !!!");
    }
}

class Row
{
    constructor (size) {
        this.length = size;
        this.cells = [size];
    }

    getByIndex(index) {
        if (this.ok(index)) { return this.cells[index]; } else { return null; } 
    }

    setByIndex(index, iValue) {
        if (this.ok(index)) { this.cells[index] = iValue; } else { }
    }

    ok(index) {
        return (index >= 0 && index < this.length);
    }
}

class Column
{
    constructor (size) {
        this.length = size;
        this.cells = [size];
    }

    getByIndex(index) {
        if (this.ok(index)) { return this.cells[index]; } else { return null; } 
    }

    setByIndex(index, iValue) {
        if (this.ok(index)) { this.cells[index] = iValue; } else { }
    }

    ok(index) {
        return (index >= 0 && index < this.length);
    }
}

class NeighBors{
    constructor (main) {
        this.main = main;
        // overlapped
        this.main_1 = main;
        this.main_2 = main.mGrid.getCell(main.row - 1, main.column);        // top
        this.main_3 = main.mGrid.getCell(main.row - 1, main.column + 1);    // top right
        this.main_4 = main.mGrid.getCell(main.row, main.column + 1);        // right

        this.left_1 = main.mGrid.getCell(main.row - 1, main.column - 1); 
        this.left_2 = main.mGrid.getCell(main.row, main.column - 1);

        this.right_1 = main.mGrid.getCell(main.row - 1, main.column + 2);
        this.right_2 = main.mGrid.getCell(main.row, main.column + 2);

        this.top_1 = main.mGrid.getCell(main.row - 2, main.column);
        this.top_2 = main.mGrid.getCell(main.row - 2, main.column + 1);

        this.bottom_1 = main.mGrid.getCell(main.row + 2, main.column);
        this.bottom_2 = main.mGrid.getCell(main.row + 2, main.column + 1);

        this.cells =[];
        this.addToList(this.main_1); this.addToList(this.main_2);
        this.addToList(this.main_3); this.addToList(this.main_4);

        this.addToList(this.left_1); this.addToList(this.left_2);
        this.addToList(this.right_1); this.addToList(this.right_2);

        this.addToList(this.top_1); this.addToList(this.top_2);
        this.addToList(this.bottom_1); this.addToList(this.bottom_2);
    }

    contain(gCell) {
        return this.cells.includes(gCell);
    }

    addToList(gCell) {
        if (gCell != null && !this.contain(gCell)) this.cells.push(gCell);
    }
}

class SpritesPair
{
    constructor(textureKey_1, textureKey_2) {
        this.textureKey_1 = textureKey_1;
        this.textureKey_2 = textureKey_2;
    }
}

class MatchPair
{
    constructor (mahjongTile_1, mahjongTile_2) {
        this.mahjongTile_1 = mahjongTile_1;
        this.mahjongTile_2 = mahjongTile_2;
    }

    isEqualTo(other) {
        var firstEqual = (this.mahjongTile_1 == other.mahjongTile_1) || (this.mahjongTile_1 == other.mahjongTile_2);
        var secondEqual = (this.mahjongTile_2 == other.mahjongTile_2) || (this.mahjongTile_2 == other.mahjongTile_1);
        return firstEqual && secondEqual;
    }

    contaiAny(mahjongTile_1, mahjongTile_2) {
        var firstEqual = (this.mahjongTile_1 == mahjongTile_1) || (this.mahjongTile_1 == mahjongTile_2);
        var secondEqual = (this.mahjongTile_2 == mahjongTile_2) || (this.mahjongTile_2 == mahjongTile_1);
        return firstEqual || secondEqual;
    }
}

class PossibleMatches
{
    constructor(freeToMatchTiles) {
        this.matchPairs = [];
        if (freeToMatchTiles == null || freeToMatchTiles.length == 0) return;
        while (freeToMatchTiles.length > 0)
        {
            var mTile = Phaser.Utils.Array.RemoveAt(freeToMatchTiles, 0);
            freeToMatchTiles.forEach ((item)=>
            {
                if (mTile.canMatchWith(item))
                {
                    var freePair = new MatchPair(mTile, item);
                    this.addMatchPair(freePair);
                }
            });
        }
    }

    addMatchPair(newPair) {
        if (!this.containMatchPair(newPair)) this.matchPairs.push(newPair);
    }

    containMatchPair(freePaar) {
        for(var si = 0; si < this.matchPairs.length; si++)
        {
            if (this.matchPairs[si].isEqualTo(freePaar)) return true;
        }
        return false;
    }

    getMatchPair(number) {
        return this.matchPairs[number];
    }

    getCount(){
        return this.matchPairs.length;
    }
}

class UndoState
{
    constructor (score, checkedCells)
    {
        this.score = score;
        this.cells = [];
        for (var i = 0; i < checkedCells.length; i++)
        {
            var gridCell = checkedCells[i];
            var states = this.getGridObjectsStates(gridCell);
            this.cells.push({"row" : gridCell.row, "column" : gridCell.column, "states" : states}); // (new GCellObects(gridCell.row, gridCell.column, gOSs));
        }
    }

    getGridObjectsStates(gC)
    {
        var gridObjects = gC.getGridObjects();
        var res = [];
        gridObjects.forEach((item)=>{
            var objectState = {"layer" : item.layer, "textureKey": item.textureKey};
            res.push(objectState);
        });
        return res;
    }

    restore(matchGrid, tileConfig)
    {
        ScoreHolder.setCount(this.score);
        this.cells.forEach((cell)=>{
            var gridCell = matchGrid.getCell(cell.row, cell.column);
            if(gridCell !== null) this.restoreCellState(gridCell, cell.states, tileConfig);
        });
    }

    restoreCellState(gridCell, states, tileConfig)
    {
        states.forEach((item)=>{
            var gO = gridCell.getLayerObject(item.layer, false);
            if (gO == null)
            {
                var gridObject = gridCell.setObject(tileConfig, item.layer);
                gridObject.setSprite(item.textureKey);
                gridObject.setToFront(false);
            }
        });     
    }
}

let ScoreHolder = {

    score : 0,
    averageScore: 100,
    changeScoreEvent: null,

    setCount: function(newScore){
        if(this.score != newScore)
        {
            this.score = newScore;
            if(this.changeScoreEvent != null) {this.changeScoreEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context, this.score);}); }
        }
        
    },

    add: function(count){
        this.setCount(this.score + count);
    },
}

let LevelHolder = {

    currentLevel : 0,
    saveKey: 'mk_level',

    getTopPassedLevel: function()
    {
        if(localStorage.hasOwnProperty(this.saveKey)) return parseInt(localStorage.getItem(this.saveKey));
        else return -1;
    },

    passLevel: function(){
        var topPassedLevel = this.getTopPassedLevel();
        if (this.currentLevel > topPassedLevel)
        {
            topPassedLevel = this.currentLevel; 
        }

        localStorage.setItem(this.saveKey, topPassedLevel); // save level
    },

    setDefaultData:function()
    {
        var topPassedLevel = -1;
        localStorage.setItem(this.saveKey, topPassedLevel); 
    },
}

let ThemeHolder = {
    saveKey : 'mk_theme',

    //'simple', 'classic'
    getThemeName: function (){
        if(localStorage.hasOwnProperty(this.saveKey))  return (localStorage.getItem(this.saveKey));
        else return 'simple'
    },
    
    saveThemeName: function (themeName){
//        console.log('save: ' + themeName);
        localStorage.setItem(this.saveKey, themeName); 
    },

    isOneGroup: function (themeSprites, texure_1, texure_2){
        var gLength = themeSprites.groups.length;
        for(var gi = 0; gi < gLength; gi++)
        {
            var group_i = themeSprites.groups[gi];
            if (group_i.collection.includes(texure_1) && group_i.collection.includes(texure_2)) {return true;}
        }
        return false;
    },

    getRandomPairs :  function (themeSprites, count, fillType) // 0 - OnlySimple, 1 - GroupsAndSimple, 2 - SimpleAndGroups, 3 - RandomGroupAndSimple
    {
        switch (fillType)
        {
            case 0:
                return this.getRandomPairs_S(themeSprites, count);
            case 1:
                return this.getRandomPairs_GAS(themeSprites, count);
            case 2:
                return this.getRandomPairs_SAG(themeSprites, count);
            case 3:
                return this.getRandomPairs_RGS(themeSprites, count);
            default:
                return this.getRandomPairs_S(themeSprites, count);
        }
    },

    getSequencedSpritesPairs: function (collection)
    {
        var count = (collection.length % 2 == 0) ? collection.length : collection.length - 1;
        var res = [];
        for (var i = 0; i < count; i += 2)
        {
            res.push(new SpritesPair(collection[i], collection[i + 1]));
        }
        return res;
    },

    getRandomPairs_S:function (themeSprites, count){
        var source = [];
        // try to add simple sprites
        while (source.length < count)
        {
            themeSprites.simpleSprites.forEach((s)=>{
                if (source.length < count) source.push(new SpritesPair(s, s));
                //else break;
            });
        }
        Phaser.Utils.Array.Shuffle(source);
        return source;
    },

    getRandomPairs_GAS:function (themeSprites, count){
        var source = [];

        // first add complete groups
        themeSprites.groups.forEach((group)=>{
            var groupSprites = ThemeHolder.getSequencedSpritesPairs(group.collection);
            if (source.length + groupSprites.length <= count) {
                source = source.concat(groupSprites);
            }
        //else break;
        });

        // try to add simple sprites
        while (source.length < count)
        {
            themeSprites.simpleSprites.forEach((s)=>{
                if (source.length < count) source.push(new SpritesPair(s, s));
             //else break;
            });
        }

        Phaser.Utils.Array.Shuffle(source);
        return source;
    },

    getRandomPairs_SAG:function (themeSprites, count){
        var source = [];
        var simple = [];
 
        // first add simple sprites
        themeSprites.simpleSprites.forEach((s)=>{
            if (simple.length < count) simple.push(new SpritesPair(s, s));
            //else break;
        });
        source = source.concat(simple);

        // add complete groups
        themeSprites.groups.forEach((group)=>{
            var groupSprites = ThemeHolder.getSequencedSpritesPairs(group.collection);
            if (source.length + groupSprites.length <= count) {
                source = source.concat(groupSprites);
            }
            //else break;
        });

        // again add simple sprites
        var indexSimple = 0;
        while (source.length < count) {
            source.push(simple[indexSimple]);
            indexSimple++;
            if (indexSimple >= simple.length) indexSimple = 0;
        }

        Phaser.Utils.Array.Shuffle(source);
        return source;
    },

    getRandomPairs_RGS: function (themeSprites, count){
        var source = [];

        // first add complete groups
        if (themeSprites.groups.length > 0) {
            var randGroup = themeSprites.groups[Math.floor(Math.random() * themeSprites.groups.length)];
            var groupSprites = ThemeHolder.getSequencedSpritesPairs(randGroup.collection); // sprites from random group
            if (source.length + groupSprites.length <= count) {
                source = source.concat(groupSprites);
            }
        }

        // try to add simple sprites
        while (source.length < count) {
            themeSprites.simpleSprites.forEach((s)=>{
                if (source.length < count) source.push(new SpritesPair(s, s));
                //else break;
            });
        }

        Phaser.Utils.Array.Shuffle(source);
        return source;
    }
}

let ShufflesHolder = {
    count: 0,
    changeCountEvent: null,
    saveKey : 'mk_shuffles',
    defaultCount: 5,
    maxCount: 10,

    load: function (){
        var _count  = this.defaultCount;
        if(localStorage.hasOwnProperty(this.saveKey)) _count = parseInt(localStorage.getItem(this.saveKey)); 
        this.setCount(_count);
    },

    addCount: function(_count){
        this.setCount(this.count + _count);
    },

    setCount: function(newCount){
        if(newCount > this.maxCount) newCount = this.maxCount;
        if(newCount < 0) newCount = 0;
        if(this.count != newCount)
        {
            this.count = newCount;
            if(this.changeCountEvent != null) {this.changeCountEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context, this.count);}); }
            localStorage.setItem(this.saveKey, this.count); 
        }
    }
}

let HintsHolder = {
    count: 0,
    changeCountEvent: null,
    saveKey : 'mk_hints',
    defaultCount: 5,
    maxCount: 10,

    load: function (){
        var _count  = this.defaultCount;
        if(localStorage.hasOwnProperty(this.saveKey)) _count = parseInt(localStorage.getItem(this.saveKey)); 
        this.setCount(_count);
    },

    addCount: function(_count){
        this.setCount(this.count + _count);
    },

    setCount: function(newCount){
        if(newCount > this.maxCount) newCount = this.maxCount;
        if(newCount < 0) newCount = 0;
        if(this.count != newCount)
        {
            this.count = newCount;
            if(this.changeCountEvent != null) {this.changeCountEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context, this.count);}); }
            localStorage.setItem(this.saveKey, this.count); 
        }
    }
}

let ScoreController = {
    baseMatchScore : 240,
    increaseComboScore : 40,
    maxMatchScore : 40,
    combo : 0,  // combos counter

    getMatchScore:function() {
        return this.getScoreForCombo(this.combo);
    },

    collectMatcEventHandler:function() {
        this.combo++;
    },

    getScoreForCombo:function(_combo) {
        var score = this.baseMatchScore + 40 * _combo;
        if (score > 600) score = 600;
        return score;
    },

    getMaxLevelScore:function(matchesCount)
    {
        var score = 0; 
        for (var _combo = 0; _combo < matchesCount; _combo++) {
            score += this.getScoreForCombo(_combo);
        }
        return score;
    },

    reset:function(){
        this.combo = 0;
    }
} 

