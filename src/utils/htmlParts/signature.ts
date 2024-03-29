import moment from 'moment';

export const pdfSignature = `
<h3
style="
  padding-top: 3pt;
  text-indent: 0pt;
  text-align: center;
"
>
Sinop, ${moment().format('DD/MM/YYYY')}
</h3>
<p style="text-indent: 0pt; text-align: left">
<span
  ><table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td>
        <img
          style="
          margin-top:20px;
          "  
          width="130"
          height="40"
          src="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoAIIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9M/BGmy6Xos8MwIZ9Sv7gD/Zku5pF/wDHXFU/FS/8I5qtt4oj+WBFW01UZ4NrklZewBidtxYkARtOcE7cWvh3fTap4A8NXtyQ1xc6ZbTysBjLtErMfzJrengjuoZIZo1likUo8brlWU8EEHqDXVOThWk5a6u/6nLCKnRio9lYfXLeEPF1zrmreIdJ1Gx/s/UtKvCixgllmtXJNvOD0+ZQwIBJBRs46Cx4TuJLX7XodzK0t1phURySPueW2bPkyHLFicK0ZZuWaJzgAio/EUP9k6/pWvR/KhYade7c4eGRv3TEAZYpLtAJOEWaY9yaIwinKm1dvZ/ivvXTu0EptxjUTsluvwf3P8LnS0UUVynUct488cf8IR/wj3+hfbf7W1i30n/W+X5Xm7v3n3Tuxt+7xnPUV1Ncx40gUX3ha+mdI7ax1ZXlZs9ZYJraMAAHkyzxj8c9q6et5qCpw5Vrrd/P9F+ZhByc5pvTS33f19wUVzsvje0maaPSrS81+aNS2NOiBibD7GAnkKQllOcp5m4YPHFRHxy1nA82qeHtb0qMMFTNqt40hOScLavMVAxyWAHIwTQqNR9Ne3X7tx+2p99O/T79jp6DWX4b8U6R4v01L/RdRt9StGwDJbuG2sVDbWHVWwwypwRnkVqVlKLg3GSszSMlJc0XdBRQDmipKCiiigA4oox9KKAOV+FRz8L/AAf/ANgez/8ARKVzGuap4s0v4ivFc+JbHRdHvjHBo8V1pvn21xKVO+ORw6Ms2R8o3gOD8oJDAdD8Ltbt9V0G+soGQf2Lqd5pJijj2LCkUzCGMcYIEJi5H8811V5ZW+oWs1rdQR3NtMhjkhmQMjqRgqQeCCOxr0JVPZYipzx3vuk7Xd7q+n/A+88+NP2tCHLLa3Vrpazt/V/uOEvfEV1aa/pdzqNiNP1W3Jgu7aGVpop7OVlXzoXwgfypTCXLgGNDKduHRm7jU9NttZ027sLyITWl1C8E0ZOA6MpVhx6gmuT8QfCnSNY8M6lpFs1xYrcpiEi4lkjtSFZQIoy+2NCrsjJHsDIzL0NcP4e1HV/ind6ZpGo+ItS8PTaZp+byLS3jhuLnUopXgud8i7k2RlY38sDBFzGx42itvZ060FUpy5eXfy6q273v1066GSqToydOor8235O+y2t01PTvCWqTzR3Wk6hI0mq6WywzSuADcxkZjuAABw4yCQABIkqjOzNatnYfY7i+l+0TzfaphNsmk3LFiNE2xj+Ffk3Y/vMx714D8WfEHxB+HV9aXrR2uoabaXUa23iudCHgilb95DdxQgBkJCDKoBhUI/eFdveeN/Gclppfh3xr4fvJdc0q3uRbXlhpkyut5DOVi+RMHdKkvl7Vyp++pI3GqqYKb5JwatUva2197eV3aydmuumrmnjILmhNO8O+9u/nZbtXT6a6LufE+kNr2gX1jFKtvcSxn7PcPGJPImHzRShT1KOFce6iuQ1rWx4otfBU1xFJB4X1tQ94kgALO8Qa3gmO4ARuxKsOd7iOMgrIwPeWd5BqNnBdWsyXFtOiyxTRMGV0YZVgRwQQQQRXK6PaWsOo674U1C2huLK4aTULaKdN6XEE7lp1YNw7JM0m4AYVJYM8tXHRlyp33WvpfR/NaNeh11o8zVtpfpqvk9U/U65EWJFVFCqowAowAPSnda52y8JTaZPF9i8Q6tHZxKQtjcSx3KEnPJklRpjyc8ycYAGBxRd+GNTurozL4t1e0Q4/0e3is/LH03wM3P8Avd6x5It/Gvx/yev9XNeeSXwP8P8AM19P0mx0n7T9is4LP7TM1xP5ESp5srY3O2ByxwMk8nFZfxA1S50TwH4k1Gzk8m8s9MubiGTaG2OkTMpwcg4IHB4rjtas2t/Guk6b4VvtWm1aO7jutVaXV5p7W1s85dJY5WdQ0gJEaqqtwWDKqnOnfeIk1b4vR+FGXz7GPQLme8hYh4ZWkmgVUdOmVTccH+GYdjXXGg+eM91bmd+y7779P8jmlWXLKGzvyq3d/dt1FtvB1l4G1nww2h2ywfaZmsdRmAAe7j+zyyCWYjHmS+ZEnznJ/eSf3jXdlwCASATwMnrXlOqSeJdC1bwn4estLm119Mna5iv2u0iSa1W3ktx9oYkssitPEW2q28KXUZzGub4/8Gw+Hfh5rvizxNqK3fi+FY72DVEiDJZXEbq1tBaoytsi8zYp4y+5i55+XeVD284KpO7lorat3btdX0+evRLe2Ea3sYz9nDSOr6JWSvZ21+Wm7v39pzRXGWHw7tdUs4rvxTFHq+vSKJJLne5S0kPUWmTmALwAybXOxWYluaveGby60u9bw5qlzJe3UMPn2t/NjdeQbsfNgD95HlVfAwd0bcFyi+c6cbPkldrf/gd/w9N7d8akrrnjZPb/AIPb8fyv01FJj2orA6CjYaLZ6Ze6hdW0Rjnv5VnuTvYh3CLGGwTgfKijjGcVe7UUU3Jyd2yVFRVkrBXm2peC72+8da/9lkvNMe4t4dRsNdijiZbO7KmCWLB5kR44bctGQVO0nKtsIKK3o1ZUuZx6q34oxrUo1eVS6P8ARmnqvh7xrq9hd2E2veHvs1zA8Lv/AGDI5wwIPyPdFTwf4gQe4xT9O+EHhSxfQriTR7W71LR4YorfUJYgJnMcaxo7kAB2ARcFgdpAIxgUUVX1mrbli7LysvyF9Xp3vJX9dfzHWOgav4X8YM+mFLrwxqkjy3VnI+1tPuCrMZYePmSRh8ydnbePvPWl4t8JJ4lggmt7k6XrVnvfT9ViiWSS1dl2t8rAhlYcMh4PB4YKwKKj20+ZTW6/H176aPv16lexhyuD2f4enbXVduh5nrvw68W+DBpc3g+91C+vLm3MOuah58c13dSpERbyAXbsioHZyVUg4bHoRea/+JVvY2cHiSLyLIwIt3qHhW3W6ugxLBmIkYFMAx5EUM2cOVK8YKK7oYyVWUYVIRbvu1r9/lstLJJdjhnhI0lKUJSS7X0/p9e+ptWGvWmjac+n+DPDOoz6hcS+Y326wubKIu2A9xcXE6KXPQsQXkbsDyRLJ4H1XRJtL1XSJbbUtdjuLiTUJL+ZrdLtJ1HmKCEkKBXittgwSqQqm48klFVin9Vq8kdb733d9LN/5W/IMMvrNPnlpba2yt2/4P8Ambfg7w7e6TFdX2sXMd9r2oMJLuaEERRgD5IIs8iJMtjPJZnYgFyK3buyt9Qh8m6giuYt6yeXMgZdysGU4PcMAQexANFFeXKcpy53uelGChHlWxN0rE8V2F1cWcN7p6GTU9PlFxBGrbTMBxJDyQPnQso3HaGKsfuiiiiEnGSaCcVKLTM8fFfwYABL4o0q0l/jgu7xIJoz3V43IZGHQqwBBBBAIooor6r+yKHd/h/kfJ/2vX7L8f8AM//Z"
        />
      </td>
    </tr></table
></span>
</p>
<h3
style="
  margin-top:20px;
  text-indent: 0pt;
  line-height: 9pt;
  text-align: center;
"
>
Senhor Resolve
</h3>
<p
style="
  text-indent: 0pt;
  line-height: 10pt;
  text-align: center;
"
>
Senhor Resolve
</p>
`;
