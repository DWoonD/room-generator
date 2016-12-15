function Realm(){

	var vm = this

	var $realm = $('.realm')

	vm.width = 25
	vm.height = 25

	vm.tile = {
		width: 18,
		height: 18,
		list: []
	}

	vm.drawList = []

	$realm.css('position', 'relative')
	$realm.css('width', vm.width * vm.tile.width)
	$realm.css('height', vm.height * vm.tile.height)

	vm.isTileBusy = function(x, y){
		var ret = false

		for(var i in vm.tile.list){
			var tile = vm.tile.list[i][0]
			if(tile.onMap.x == x && tile.onMap.y == y) ret = tile
		
		}

		if(!ret && vm.drawList.length > 0){
			for(var i in vm.drawList){
				var toDraw = vm.drawList[i]
				if(toDraw[0] == x && toDraw[1] == y) ret = i

			}

		}

		return ret

	}

	vm.drawTile = function(x, y, removeBorder, removeBorderFromCousin){

		console.log(x, y, removeBorder)

		var $tile = $('<div></div>')
		$tile.css('width', vm.tile.width - 4)
		$tile.css('height', vm.tile.height - 4)
		$tile.css('left', vm.tile.width * x)
		$tile.css('top', vm.tile.height * y)
		$tile.addClass('tile')
		$tile[0].onMap = {
			x: x,
			y: y
		}
		vm.tile.list.push($tile)
		$tile.appendTo($realm)

		if(removeBorder) $tile.addClass('border'+removeBorder+'Zero')
		if(removeBorderFromCousin) $tile.addClass('border'+removeBorderFromCousin+'Zero')

		var busyTile = {
			top: vm.isTileBusy(x, y - 1),
			right: vm.isTileBusy(x + 1, y),
			bottom: vm.isTileBusy(x, y + 1),
			left: vm.isTileBusy(x - 1, y)
		}

		var ifExpands = {
			top: (y > 1 && !busyTile.top && Math.random() < 0.5),
			right: (x < vm.width && !busyTile.right && Math.random() < 0.5),
			bottom: (y < vm.height && !busyTile.bottom && Math.random() < 0.5),
			left: (x > 1 && !busyTile.left && Math.random() < 0.5)

		}

		if(ifExpands.top){
			vm.drawList.push([x, y - 1, 'bottom'])
			$tile.addClass('bordertopZero')

		}

		if(ifExpands.right){
			vm.drawList.push([x + 1, y, 'left'])
			$tile.addClass('borderrightZero')

		}

		if(ifExpands.bottom){
			vm.drawList.push([x, y + 1, 'top'])
			$tile.addClass('borderbottomZero')

		}

		if(ifExpands.left){
			vm.drawList.push([x - 1, y, 'right'])
			$tile.addClass('borderleftZero')

		}


		console.log(busyTile)

		if(busyTile.top){
			$tile.addClass('bordertopZero')
			
			if(typeof busyTile.top == 'object'){
				$(busyTile.top).addClass('borderbottomZero')
				
			}

			if(typeof busyTile.top == 'number'){
				vm.tile.list[busyTile.top].push('bottom')

			}

		}

		if(busyTile.right){
			$tile.addClass('borderrightZero')
			
			if(typeof busyTile.right == 'object'){
				$(busyTile.right).addClass('borderleftZero')
				
			}

			if(typeof busyTile.right == 'number'){
				vm.tile.list[busyTile.right].push('left')

			}

		}

		if(busyTile.bottom){
			$tile.addClass('borderbottomZero')
			
			if(typeof busyTile.bottom == 'object'){
				$(busyTile.bottom).addClass('bordertopZero')
				
			}

			if(typeof busyTile.bottom == 'number'){
				vm.tile.list[busyTile.bottom].push('top')

			}

		}

		if(busyTile.left){
			$tile.addClass('borderleftZero')
			
			if(typeof busyTile.left == 'object'){
				$(busyTile.left).addClass('borderrightZero')
				
			}

			if(typeof busyTile.left == 'number'){
				vm.tile.list[busyTile.left].push('right')

			}


		}




		
		if(vm.drawList.length > 0){
			var itemDraw = vm.drawList[0]
			console.log(x, y, ' > ', itemDraw)
			vm.drawList.splice(0, 1)
			vm.drawTile(itemDraw[0], itemDraw[1], itemDraw[2], itemDraw[3])
		}

	}


}



var realm = new Realm()
realm.drawTile(1, 1)