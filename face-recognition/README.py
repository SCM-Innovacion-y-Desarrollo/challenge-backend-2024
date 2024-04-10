from io import BytesIO

from main import encode_photo, match


with open("photo1.jpg", "rb") as f:
    enrollments = encode_photo(BytesIO(f.read()))

photo2 = open("photo2.jpg", "rb")
photo3 = open("photo3.jpg", "rb")

match1 = match(encode_photo(BytesIO(photo2.read())), enrollments)
match2 = match(encode_photo(BytesIO(photo3.read())), enrollments)

print(f"Photo2 match Photo1? {match1[0]}")
print(f"Photo3 match Photo1? {match2[0]}")

photo2.close()
photo3.close()