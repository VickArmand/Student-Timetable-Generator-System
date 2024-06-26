const unit = require('../Models/units').unit;

class UnitsController{
    async create(req, res)
    {
        const unitName = req.body.unitName;

        if (!unitName) {
            return res.status(400).json({ error: 'Invalid Unit' });
        }
        const result = await unit.create({unitName});
        if (result.error)
            return res.status(400).json(result);
        return res.status(201).json(result);
    }
    async update(req, res)
    {
        const _id = req.params.id;
        const updatedObj = req.body;
        if (!_id)
            return res.status(400).json({ error: 'Id required' });
        if (Object.keys(updatedObj).length < 1)
            return res.status(400).json({ error: 'Empty objects not allowed' });
        const result = await unit.update({_id}, updatedObj);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async find(req, res)
    {
        const result = await unit.find(req.query);
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
    async delete(req, res)
    {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({error: 'Id required'});
        const result = await unit.delete({_id: id});
        if (result.error)
            return res.status(400).json(result);
        return res.status(200).json(result);
    }
}
exports.unitController = new UnitsController()