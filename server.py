from aiohttp import web

async def analyze_photo_handler(request):
    # WARNING: don't do that if you plan to receive large files!
    data = await request.post()
    print(data['photo']);

    photo = data['photo']
    blob = photo.file
    content = blob.read()
    print(content)

    return web.json_response(data)

app = web.Application()
app.add_routes([web.post('/api/analyze', analyze_photo_handler)])

web.run_app(app)
