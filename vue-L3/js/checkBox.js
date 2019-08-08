Vue.component("check-box", {
	template: "<div class='check-box' :class='{checked:flag}' @click='select' > <slot></slot> </div>",
	data: function() {
		return {
			arr: [],
			flag: false
		}
	},
	model: {
		prop: "val",
		event: 'input'
	},
	props: {
		val: {
			type: [Array, Boolean],
			required: true
		},
		value: {
			default: ''
		}
	},
	methods: {
		select: function() {
			this.flag = !this.flag;
			if(typeof this.val == 'boolean') {
				this.$emit('input', this.flag);
			} else {
				if(this.flag) {
					this.arr.push(this.value);
				} else {
					var that = this;
					var index = 0;
					this.arr.forEach(function(item, inx) {
						if(item == that.value) {
							index = inx;
						}
					});
					this.arr.splice(index, 1);
				}

				this.$emit('input', this.arr);
			}

		}
	},
	watch: {
		val: function(val) {
			if(typeof val == 'boolean') {
				this.flag = val;
			} else {
				this.arr = val;
				var that = this;
				var a = false;
				this.arr.forEach(function(item, index) {
					if(item == that.value) {
						a = true;
					}
				});
				this.flag = a;
			}
		}
	},
	created: function() {
		this.arr = this.val;

		if(typeof this.val == 'boolean') {
			this.flag = this.val;
		} else {
			var that = this;
			this.arr.forEach(function(item, index) {
				if(item == that.value) {
					that.flag = true;
				}
			});
		}

	}

});