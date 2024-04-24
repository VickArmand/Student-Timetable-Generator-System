class Views {
    async find(controller, obj) {
        return await controller.find(obj)
    }
    create(controller, data) {
        controller.create(data)
    }
    update(controller, existObj, updatedObj) {
        controller.update(existObj, updatedObj)
    }
    delete(controller, data) {
        controller.delete(data)
    }
}
exports.views = new Views()