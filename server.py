from base64 import b64decode
from io import BytesIO

from aiohttp import web
from PIL import Image


async def analyze_photo_handler(request):
    # WARNING: don't do that if you plan to receive large files!
    data = await request.post()
    print(data['photo']);

    content = data['photo']
    print(content)
    image = Image.open(BytesIO(b64decode(content)))
    image.convert('RGB')
    if image.mode in ('RGBA', 'LA'):
        background = Image.new(image.mode[:-1], image.size, (255, 255, 255))
        background.paste(image, image.split()[-1])
        image = background

    image.save('pil.jpg', 'JPEG', quality=80, optimize=True, progressive=True)
    return web.json_response({'status': 'success'})

app = web.Application()
app.add_routes([web.post('/api/analyze', analyze_photo_handler)])

web.run_app(app)
